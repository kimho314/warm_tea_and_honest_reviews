/**
 * 날짜 문자열(YYYY-MM-DD 등)을 유럽 형식(dd/MM/yyyy)으로 변환합니다.
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString // 유효하지 않은 날짜인 경우 원본 반환

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
