export const createElement = (
  element: string,
  className?: string[],
  atrributes?: Record<string, string>
): HTMLElement => {
  const el = document.createElement(element)

  if (className?.length) el.classList.add(...className)

  for (const attr in atrributes) el.setAttribute(attr, atrributes[attr])

  return el
}

export const toSlug = (str: string): string => {
  return str.replace(/\s+/g, '-').toLowerCase()
}
