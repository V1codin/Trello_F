const { AuthenticationService } = require("@feathersjs/authentication");
const { NotAuthenticated } = require("@feathersjs/errors");
const logger = require("../../logger");
const { Types } = require("mongoose");

exports.CustomAuth = class CustomAuth extends AuthenticationService {
  //async refreshToken(authPayload) {}
  /**
   * Create and return a new JWT for a given authentication request.
   * Will trigger the `login` event.
   * @param data The authentication request (should include `strategy` key)
   * @param params Service call parameters
   */

  async getUserPayload(userId) {
    const ownerObjId = Types.ObjectId(userId);

    const boards = await this.app.service("boards").find({
      query: {
        $or: [{ ownerId: ownerObjId }, { memberIds: { $in: userId } }],
      },
    });

    const notes = await this.app.service("notifications").find({
      query: { recipient: ownerObjId },
    });

    return { boards, notes };
  }

  async create(data, params) {
    const { entity } = this.configuration;
    const authStrategies =
      params.authStrategies || this.configuration.authStrategies;

    if (!authStrategies.length) {
      throw new NotAuthenticated(
        "No authentication strategies allowed for creating a JWT (`authStrategies`)"
      );
    }

    let refreshTokenPayload;
    let authResult;

    if (data.action === "refresh" && !data.refresh_token) {
      throw new NotAuthenticated("No refresh token");
    } else if (data.action === "refresh") {
      refreshTokenPayload = await this.verifyAccessToken(
        data.refresh_token,
        params.jwt
      );
      if (refreshTokenPayload.tokenType !== "refresh") {
        throw new NotAuthenticated("Invalid token");
      }

      authResult = {
        [entity]: refreshTokenPayload[entity],
        authentication: { strategy: data.strategy },
      };
    } else {
      authResult = await this.authenticate(data, params, ...authStrategies);
      console.log("authResult: ", authResult);
    }

    logger.debug("Got authentication result " + JSON.stringify(authResult));

    if (authResult && authResult.accessToken) {
      return authResult;
    }

    const [payload, jwtOptions] = await Promise.all([
      this.getPayload(authResult, params),
      this.getTokenOptions(authResult, params),
    ]);

    logger.debug(
      `Creating JWT Access Token with ${JSON.stringify(
        payload
      )}, ${JSON.stringify(jwtOptions)}`
    );

    const accessToken = await this.createAccessToken(
      payload,
      jwtOptions,
      params.secret
    );

    /**
     * Generate refresh token
     */
    const refreshTokenJwtOptions = {
      ...jwtOptions,
      expiresIn: this.configuration.refreshExpiresIn,
    };

    refreshTokenPayload = {
      ...payload,
      tokenType: "refresh",
      [entity]: authResult[entity],
    };

    logger.debug(
      `Creating JWT Refresh Token with ${JSON.stringify(
        refreshTokenPayload
      )}, ${JSON.stringify(refreshTokenJwtOptions)}`
    );

    const refreshToken = await this.createAccessToken(
      refreshTokenPayload,
      refreshTokenJwtOptions,
      params.secret
    );

    const {
      user: { _id },
    } = authResult;

    const userData = await this.getUserPayload(_id);

    return Object.assign(
      {},
      { accessToken, refreshToken: refreshToken },
      authResult,
      userData
    );
  }
};
