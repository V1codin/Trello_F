const { JWTStrategy } = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { NotAuthenticated } = require("@feathersjs/errors");
const { expressOauth } = require("@feathersjs/authentication-oauth");

const logger = require("../../logger");
const hooks = require("./authentication.hooks");

const { CustomAuth } = require("./authentication.class");

class MyJwtStrategy extends JWTStrategy {
  async authenticate(authentication, params) {
    const { accessToken } = authentication;
    const { entity } = this.configuration;

    if (!accessToken) {
      throw new NotAuthenticated("No access token");
    }

    const payload = await this.authentication.verifyAccessToken(
      accessToken,
      params.jwt
    );

    // If token type is refresh token then throw error
    if (payload.tokenType === "refresh") {
      logger.info(`User (${payload.sub}) tried to access using refresh token`);
      throw new NotAuthenticated("Invalid access token");
    }

    const userPayload = await this.authentication.getUserPayload(payload.sub);

    const result = {
      accessToken,
      authentication: {
        strategy: "jwt",
        accessToken,
        payload,
      },
      ...userPayload,
    };

    if (entity === null) {
      return result;
    }

    const entityId = await this.getEntityId(result, params);
    const value = await this.getEntity(entityId, params);

    return {
      ...result,
      [entity]: value,
    };
  }
  /*
  async authenticate(authentication, params) {
    const payload = await super.authenticate(authentication, params);
    const isExpired = jwtChecker(payload.authentication.payload.exp);

    const res = Object.assign({}, payload);

    // ! not working
    if (isExpired) {
      delete res.accessToken;
    }

    return res;
  }
  */
}

module.exports = (app) => {
  const authentication = new CustomAuth(app, "authentication");

  const myJwtStrategy = new MyJwtStrategy();

  authentication.register("jwt", myJwtStrategy);
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);

  const authService = app.service("authentication");
  authService.hooks(hooks);

  app.configure(expressOauth());
};
