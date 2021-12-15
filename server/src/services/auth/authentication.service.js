const { JWTStrategy } = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const hooks = require("./authentication.hooks");

const { CustomAuth } = require("./authentication.class");

const jwtChecker = require("../../hooks/jwtRefresh");

class MyJwtStrategy extends JWTStrategy {
  // ? customization for refresh jwt token
  /**
   * * for every request to the server from a client
   * * the server checks if expiration of the client's
   * * jwt token is not less than 2(optional) mins
   * * if so - refresh a token
   *
   * TODO put the token that's server got from LOGOUT to Blacklist
   * that nobody could use the unexpired token after client's logout
   */
  async authenticate(authentication, params) {
    const payload = await super.authenticate(authentication, params);
    const isExpired = jwtChecker(payload.authentication.payload.exp);

    const res = Object.assign({}, payload);

    // ! not working
    if (isExpired) {
      /*
      TODO
      return this.app.service("authentication").refreshToken(payload)
      */
      // ? if delete the accessToken the strategy will regenerate a new token
      delete res.accessToken;
    }

    return res;
  }
}

module.exports = (app) => {
  const authentication = new CustomAuth(app, (configKey = "authentication"));

  const myJwtStrategy = new MyJwtStrategy();

  authentication.register("jwt", myJwtStrategy);
  authentication.register("local", new LocalStrategy());

  app.use("/authentication", authentication);

  const authService = app.service("authentication");
  authService.hooks(hooks);

  app.configure(expressOauth());
};
