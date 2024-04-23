/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_AGORA_WHITE_APP_ID: string;
  readonly VITE_AGORA_RTC_APP_ID: string;
  readonly VITE_AGORA_WHITE_AK: string;
  readonly VITE_AGORA_WHITE_SK: string;
  readonly VITE_AGORA_RTC_TOKEN: string;
  readonly VITE_AGORA_SDK_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
