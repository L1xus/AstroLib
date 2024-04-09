export const shortAddress = (address: string, length: number = 8): string | null => {
  if (!address) return null
  return (
    address.slice(0, length) + "...." + address.slice(address.length - length)
  )
}
