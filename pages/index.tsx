import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { Post } from "../typings"
import {sanityClient, urlFor} from "../sanity"
import Link from 'next/link'
interface Props{
    posts: [Post]
}

function Home({ posts }: Props) {

  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium App</title>
        <meta name="description" content="Your one stop blog app" />
        <link rel="icon" href="/medium.png" />
      </Head>

      <main>

        <Header />
        <Banner />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 mt-3">
          {posts.map((post) => (
               <Link key={post._id} href={`/post/${post.slug.current}`}>
                  <section>
                   <div className="group cursor-pointer border rounded-lg shadow-md overflow-hidden p-2">
                      <Image className=' group-hover:scale-105 transition ease-in-out w-full object-cover' src ={urlFor(post.mainImage).url()} alt="" height="160" width="260"  />
                    <div className="flex justify-between p-5 bg-gray-100 rounded-md shadow-sm">
                      <div >
                        <h2 className="font-bold text-lg text-green-800 font-sans group-hover:text-green-400 transition ease-in-out">{post.title}</h2>
                         <p className="text-sm">{post.description}   <span className = "font-bold"> Author -  {post.author.name} </span> </p>
                    </div>
                    {/**  <Image className='rounded-full group-hover:scale-105 transition ease-in-out ' src ={urlFor(post.author.image).url()} alt="" width="47" height="28" /> */}
                     
                    </div>
               
                  </div>
                 
                 
          </section>
              </Link>
            
            )
          )}
        </div>
      </main>
    </div>
  )
}
export const getServerSideProps = async () =>{
  const query = `*[_type=="post"]{
    _id,
    title,
    author ->{
    name,
    image
  },
   description,
    mainImage,
     slug
  }`;
  const posts = await sanityClient.fetch(query)
  return{
      props:{
          posts
      }
  }
}
export default Home
