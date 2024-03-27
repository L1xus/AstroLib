import pinataSDK from '@pinata/sdk'
import fs from 'fs'
import formidable from 'formidable'

const pinata = new pinataSDK(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_API_SECRET)

export const testAuthentication = async () => {
    try {
      const result = await pinata.testAuthentication()
      return result
    } catch (error) {
      console.error('Error Authenticating!', error)
      throw error
    }
}

export const pinFile = async (file) => {
  try {
    const readableStreamForFile = fs.createReadStream(file.filepath)
    const options = {
      pinataMetadata: {
        name: file.originalFilename,
      },
    }
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options)
    fs.unlinkSync(file.filepath)
    console.log('shit:', result)
    return result
  } catch (error) {
    console.error('Error Pinning File to IPFS')
    throw error
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm()
      form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log({ err });
          return res.status(500).send("Pin Error")
        }
        const response = await pinFile(files.file)
        const { IpfsHash } = response

        return res.send(IpfsHash)
      })
    } catch (e) {
      console.log(e)
      res.status(500).send("Server Error")
    }
  }
}
