interface ImportMetaEnv {
    readonly VITE_CALENDAR_API_KEY: string
    readonly VITE_CALENDAR_ID: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }