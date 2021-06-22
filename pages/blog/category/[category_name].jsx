import fs from "fs"
import path from "path"
import matter from 'gray-matter'

import Layout from "../../../components/Layout"
import CategoryList from "../../../components/CategoryList"
import Post from "../../../components/Post"
import { getPosts } from '../../../lib/posts'

export default function CategoryPage({ posts, categoryName, categories }) {

    // console.log(posts);

    return (
        <Layout>
            <div className='flex justify-between'>
                <div className='w-3/4 mr-10'>
                    <h1 className='p-5 text-5xl font-bold border-b-4'>
                        Posts in {categoryName}
                    </h1>

                    <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
                        {posts.map((post, index) => (
                            <Post key={index} post={post} />
                        ))}
                    </div>
                </div>

                <div className='w-1/4'>
                    <CategoryList categories={categories} />
                </div>
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {

    const files = fs.readdirSync(path.join('posts'))
    const category = files.map(filename => {
        const markdownWithMeta = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        )
        const { data: frontmatter } = matter(markdownWithMeta)

        return frontmatter.category.toLowerCase()
    })

    // console.log(category);

    const paths = category.map(category => ({
        params: {
            category_name: category
        }
    }))

    return {
        paths,
        fallback: false
    }
}


export const getStaticProps = async ({ params: { category_name } }) => {

    console.log(category_name);

    // Read post's path [.md]
    const files = fs.readdirSync(path.join('posts'))

    // Call getPosts
    const posts = getPosts()

    // Get category for sidebar
    const categories = posts.map(post => post.frontmatter.category)
    // Crete unique categories
    const uniqueCategories = [...new Set(categories)]

    // Filter posts by category
    const categoryPosts = posts.filter(post => {
        return post.frontmatter.category.toLowerCase() === category_name
    })

    return {
        props: {
            posts: categoryPosts,
            categoryName: category_name,
            categories: uniqueCategories
        }
    }
}

