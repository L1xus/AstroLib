export const shortAddress = (address, length = 8) => {
  if (!address) return null
  return (
    address.slice(0, length) + "...." + address.slice(address.length - length)
  )
}
