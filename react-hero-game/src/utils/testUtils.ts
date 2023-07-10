export function getAllByTagName(
  container: HTMLElement,
  tagName: keyof JSX.IntrinsicElements,
) {
  return Array.from(container.querySelectorAll<HTMLElement>(tagName));
}