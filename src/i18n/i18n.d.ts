// The two translation bundles are ported verbatim from the design export as
// plain ES modules, so their shape is described here rather than rewritten.

declare module '*/i18n/ui.js' {
  export const UI: Record<string, Record<string, any>>
}

declare module '*/i18n/content.js' {
  export const CONTENT: Record<
    string,
    {
      listings?: Record<string, Record<string, any>>
      hoods?: Record<string, string>
      articles?: Record<string, { tag?: string; title?: string }>
      testi?: { q: string; role: string }[]
    }
  >
}
