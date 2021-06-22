import fs from "fs"
import path from "path"
import Layout from "../../../components/Layout"
import Post from "../../../components/Post"
import Pagination from "../../../components/Pagination"

import CategoryList from "../../../components/CategoryList"
import { POSTS_PER_PAGE } from '../../../config'
import { getPosts } from '../../../lib/posts'

const BlogPage = ({ posts, numPages, currentPage, categories }) => {

    // console.log(posts);

    return (
        <Layout>

            <div className="flex justify-between">
                <div className="w-3/4 mr-10">

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

                </div>

                <div className="w-1/4">
                    <CategoryList categories={categories} />
                </div>
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

    // Get category for sidebar
    const categories = posts.map(post => post.frontmatter.category)
    // Crete unique categories
    const uniqueCategories = [...new Set(categories)]
    // console.log(uniqueCategories);

    // Create page number
    const numPages = Math.ceil(files.length / POSTS_PER_PAGE)
    const pageIndex = page - 1
    const orderedPosts = posts
        .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

    return {
        props: {
            posts: orderedPosts,
            numPages,
            currentPage: page,
            categories: uniqueCategories
        }
    }
}

export default BlogPage
