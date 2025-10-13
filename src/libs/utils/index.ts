export function formatDate(date: any, local: any) {
  const d = new Date(date)
  const options: any = { year: "numeric", month: "short", day: "numeric" }
  const res = new Intl.DateTimeFormat(local, options).format(d)
  return res
}
