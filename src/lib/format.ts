export const formatDate = (date: Date, format: string): string => {
  const map = {
    YYYY: date.getFullYear(),
    MM: (date.getMonth() + 1).toString().padStart(2, "0"),
    DD: date.getDate().toString().padStart(2, "0"),
    hh: date.getHours().toString().padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0"),
  }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, (matched: string) => {
    return String(map[matched as keyof typeof map])
  })
}
