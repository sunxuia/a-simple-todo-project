export function trim(str) {
  return str == null ? '' : str.replace(/^\s+/, '').replace(/\s+$/, '')
}
