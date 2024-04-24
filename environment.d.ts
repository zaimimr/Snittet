// From https://stackoverflow.com/questions/51503754/typescript-type-beforeinstallpromptevent
type UserChoice = Promise<{
  outcome: 'accepted' | 'dismissed';
  platform: string;
}>;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: UserChoice;
  prompt(): Promise<UserChoice>;
}

declare module 'object.hasown' {
  import * as objectHasOwn from 'object.hasown';
  interface ObjectHasOwn {
    shim: () => (o: object, v: PropertyKey) => boolean;
  }
  export default objectHasOwn as ObjectHasOwn;
}

declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      [key: string]: string | undefined;
      NODE_ENV: 'development' | 'production' | 'test';
      VERCEL_ENV: 'development' | 'production' | 'preview';
      readonly VERCEL_URL?: string;
    }
  }
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
