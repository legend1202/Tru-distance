import express from 'express';
import { ClientSession } from 'mongoose';
import { User } from '../../models/user.model';

declare global {
  namespace Express {
    interface Request {
      session?: ClientSession;
      user?: User;
    }
  }
}

declare module 'passport';

declare module 'passport-azure-ad' {
  import { Strategy } from 'passport';

  interface IProfile {
    oid?: string;
    displayName?: string;
    emails?: string[];
    // Add additional properties you need from the profile
  }

  interface IOIDCOptions {
    identityMetadata: string;
    clientID: string;
    responseType: string;
    responseMode: string;
    redirectUrl: string;
    clientSecret?: string;
    privateKey?: string;
    thumbprint?: string;
    // Add other properties according to your config
  }

  type VerifyCallback = (err: any, user?: any, info?: any) => void;

  class OIDCStrategy extends Strategy {
    constructor(
      options: IOIDCOptions,
      verify: (
        iss: string,
        sub: string,
        profile: IProfile,
        accessToken: string,
        refreshToken: string,
        done: VerifyCallback
      ) => void
    );
  }

  export { OIDCStrategy, IOIDCOptions, IProfile, VerifyCallback };
}
