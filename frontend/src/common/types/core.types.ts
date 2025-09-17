export interface Option<T = string | number> {
  id: string | number
  label: string
  value: T
}
