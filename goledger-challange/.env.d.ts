// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    GOOGLE_APPLICATION_CREDENTIALS: string;
  }
}
