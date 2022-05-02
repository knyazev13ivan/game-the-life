export function RandomColor(): string {
  return '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).slice(1)
}