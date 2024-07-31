/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_PORT: string;
  readonly APP_QUOTESMOCK_URL: string;
  readonly APP_QUOTESMOCK_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
