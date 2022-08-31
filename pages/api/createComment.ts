// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import SanityClient from '@sanity/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  
  message: string
}

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN
}

  const client = SanityClient(config)

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const{_id,name,email,comment} = JSON.parse(req.body)  //here we are destructuring from the form we pushed through
    try{ //here we are creating a document in sanity
      await client.create({
        _type:'comment',
        post:{
          _type: 'reference',
          _ref:_id
        },
        name,
        email,
        comment
      });
    } catch(err){
     return res.status(500).json({ message:"couldnt submit comment"})
    }

  res.status(200).json({ message: 'Comment submitted' })
}
