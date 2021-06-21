import fs from "fs"
import path from "path"
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from "../components/Layout"
import Post from "../components/Post"
import { sortByDate } from '../utils'

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

  // Read post's path [.md]
  const files = fs.readdirSync(path.join('posts'))

  const posts = files.map((filename) => {

    const slug = filename.replace('.md', '')

    // Read files
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    // Extract slug - header
    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter
    }

  })

  // console.log(posts);

  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6)
    }
  }
}
