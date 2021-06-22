import Link from 'next/link'
import Layout from "../components/Layout"
import Post from "../components/Post"
import { getPosts } from '../lib/posts'

export default function Home({ posts }) {

  // console.log(posts);

  return (
    <Layout>
      <h1 className="p-5 text-5xl font-bold border-b-4">
        Latest Posts
      </h1>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {
          posts.map((post, index) => (
            <Post key={index} post={post} />
          ))
        }
      </div>

      <Link href="/blog">
        <a className="block w-full py-4 my-5 text-center text-gray-800 transition duration-500 border border-gray-500 rounded-md select-none ease hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline">
          All Posts
        </a>
      </Link>

    </Layout>
  )
}


export const getStaticProps = async () => {

  return {
    props: {
      posts: getPosts().slice(0, 3)
    }
  }
}
