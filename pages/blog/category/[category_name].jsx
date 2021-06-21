import fs from "fs"
import path from "path"
import matter from 'gray-matter'
import Link from 'next/link'
import Layout from "../../../components/Layout"
import Post from "../../../components/Post"
import { sortByDate } from '../../../utils'

export default function CategoryPage({ posts, categoryName }) {

    // console.log(posts);

    return (
        <Layout>
            <h1 className="p-5 text-5xl font-bold border-b-4">
                Posts in {categoryName}
            </h1>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {
                    posts.map((post, index) => (
                        <Post key={index} post={post} />
                    ))
                }
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

    console.log(category);

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

    // Filter posts by category
    const categoryPosts = posts.filter(post => {
        return post.frontmatter.category.toLowerCase() === category_name
    })

    return {
        props: {
            posts: categoryPosts.sort(sortByDate),
            categoryName: category_name,

        }
    }
}

