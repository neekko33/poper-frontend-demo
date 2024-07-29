export const formatTime = (timestamp: string) => {
  const date =  new Date(parseInt(timestamp))
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `
}