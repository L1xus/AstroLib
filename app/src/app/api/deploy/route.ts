import { NextResponse, NextRequest } from "next/server"

export const dynamic = 'force-static'
export const revalidate = 60

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    try {
      const data = await request.formData()
      const metadataBlob = data.get('file')
      if (!metadataBlob) {
        return NextResponse.json({ error: 'Metadata is required' }, { status: 400 })
      }
      const metadataString = await metadataBlob.text()
      const metadata = JSON.parse(metadataString)
      console.log(metadata)

      const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      })
      const { IpfsHash } = await res.json()
      console.log(IpfsHash)

      return NextResponse.json({ IpfsHash }, { status: 200 })
    } catch (e) {
      console.error(e)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}

