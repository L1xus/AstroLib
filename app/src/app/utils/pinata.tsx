'use server'

import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_API_SECRET)

export const testAuthentication = async () => {
    try {
      const result = await pinata.testAuthentication()
      console.log(result)
      return result
    } catch (error) {
      console.error('Error Authenticating!', error)
      throw error
    }
}
