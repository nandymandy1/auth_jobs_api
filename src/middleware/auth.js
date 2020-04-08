import passport from "passport";
import { User } from "../models";
import { Strategy, ExtractJwt } from "passport-jwt";
import { APP_SECRET as secretOrKey } from "../config";

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async ({ id, userKey }, done) => {
    try {
      let user = await User.findById(id);
      if (user) {
        if (userKey !== user.userKey) {
          return done(null, false);
        }
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(null, false);
    }
  })
);
