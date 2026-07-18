import { useEffect } from 'react'

const SUFFIX = 'Crest Range Properties'

/** Per-route document title and meta description. With real routing each page
 *  is a distinct URL, so each one needs its own title for history, bookmarks,
 *  tab labels and sharing. */
export default function PageHead({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : SUFFIX
  }, [title])

  useEffect(() => {
    if (!description) return
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    const prev = tag.content
    tag.content = description
    return () => {
      tag!.content = prev
    }
  }, [description])

  return null
}
