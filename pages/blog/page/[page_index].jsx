import fs from "fs"
import path from "path"
import Layout from "../../../components/Layout"
import Post from "../../../components/Post"
import Pagination from "../../../components/Pagination"

import { POSTS_PER_PAGE } from '../../../config'
import { getPosts } from '../../../lib/posts'

const BlogPage = ({ posts, numPages, currentPage }) => {

    // console.log(posts);

    return (
        <Layout>
            <h1 className="p-5 text-5xl font-bold border-b-4">
                All Blogs
            </h1>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map((post, index) => (
                        <Post key={index} post={post} />
                    ))
                }
            </div>

            <Pagination currentPage={currentPage} numPages={numPages} />

        </Layout>
    )
}

// # Get paths.
export const getStaticPaths = async () => {

    const files = fs.readdirSync(path.join('posts'))
    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

    let paths = []

    for (let i = 1; i <= numPages; i++) {
        paths.push({
            params: {
                page_index: i.toString()
            }
        })
    }

    // console.log(paths);

    return {
        paths,
        fallback: false
    }
}

// # Get posts and Create page number.
export const getStaticProps = async ({ params }) => {

    const page = parseInt((params && params.page_index) || 1)

    // Read post's path [.md]
    const files = fs.readdirSync(path.join('posts'))

    // Call getPosts
    const posts = getPosts()

    // Create page number
    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
    const pageIndex = page - 1
    const orderedPosts = posts
        .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

    return {
        props: {
            posts: orderedPosts,
            numPages,
            currentPage: page
        }
    }
}

export default BlogPage
