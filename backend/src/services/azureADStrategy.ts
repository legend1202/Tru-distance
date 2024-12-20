import passport from 'passport';
import jwt from 'jsonwebtoken';
import {
  OIDCStrategy,
  IOIDCStrategyOptionWithRequest,
  IProfile,
  VerifyCallback,
} from 'passport-azure-ad';
import { Request } from 'express'; // Assuming you are using express
import { UserModel } from '../models/user.model';

const config: IOIDCStrategyOptionWithRequest = {
  clientID: process.env.AZURE_CLIENT_ID!,
  clientSecret: process.env.AZURE_CLIENT_SECRET!,
  identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  responseType: 'code',
  responseMode: 'query',
  redirectUrl: 'http://localhost:8080/auth/azure/callback',
  allowHttpForRedirectUrl: false,
  passReqToCallback: true, // must be exactly true
  scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],
};

passport.use(
  new OIDCStrategy(
    config,
    async (
      req: Request,
      iss: string,
      sub: string,
      profile: IProfile,
      accessToken: string,
      refreshToken: string,
      params: any,
      done: VerifyCallback
    ) => {
      try {
        if (!profile || !profile.oid) {
          return done(new Error('No OID found in profile'), null);
        }

        const email =
          profile.emails && profile.emails.length > 0 ? profile.emails[0] : '';
        let user = await UserModel.findOne({ microsoftId: profile.oid });

        const secretKey: string = process.env.JWT_SECRET_KEY || '';

        if (!user) {
          user = new UserModel({
            microsoftId: profile.oid,
            email: email,
            name: profile.displayName || '',
          });
          await user.save();
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
          expiresIn: '6d',
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
