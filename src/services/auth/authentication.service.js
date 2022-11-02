const axios = require("axios");
const qs = require("qs");
const jwt = require("jsonwebtoken");

const { JWTStrategy } = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { OAuthStrategy } = require("@feathersjs/authentication-oauth");
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

class GoogleStrategy extends OAuthStrategy {
  async authenticate(authentication) {
    const {
      oauth: {
        google,
        google: { tokenApiUrl },
      },
    } = this.app.get("authentication");

    const userService = this.app.service("users");

    const opts = {
      code: authentication.code,
      client_id: google.key,
      client_secret: google.secret,
      redirect_uri: google.redirect_uri,
      grant_type: "authorization_code",
    };

    try {
      const { data } = await axios.post(tokenApiUrl, qs.stringify(opts), {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      });

      const user = jwt.decode(data.id_token);

      const existingUser = await userService.find({
        query: {
          email: user.email,
        },
      });

      if (existingUser.data.length) {
        return {
          user: existingUser.data[0],
        };
      }

      const formatted = this.formatUserData(user);
      const createdUser = await userService.create(formatted);

      return {
        user: createdUser,
      };
    } catch (e) {
      console.log("google auth error", e);
    }
  }

  formatUserData(data) {
    const res = {
      displayName: data.name,
      imageURL: data.picture,
      email: data.email,
      externalLogin: "google",
    };
    return res;
  }

  async getEntityData(profile) {
    // this will set 'googleId'
    const baseData = await super.getEntityData(profile);

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      profilePicture: profile.picture,
      email: profile.email,
    };
  }
}

module.exports = (app) => {
  const authentication = new CustomAuth(app, "authentication");

  const myJwtStrategy = new MyJwtStrategy();

  authentication.register("jwt", myJwtStrategy);
  authentication.register("local", new LocalStrategy());
  authentication.register("google", new GoogleStrategy());

  app.use("/authentication", authentication);

  const authService = app.service("authentication");
  authService.hooks(hooks);

  app.configure(expressOauth());
};
