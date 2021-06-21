import React from 'react'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'

import Layout from '../../components/Layout'
import CategoryLabel from '../../components/CategoryLabel'

const Blog = ({
    frontmatter: {
        title,
        category,
        date,
        author,
        author_image,
        cover_image,
        excerpt
    },
    content,
    slug
}) => {

    // console.log(frontmatter, content, slug);

    return (
        <Layout title={title}>
            <Link href="/blog">Go Back</Link>

            <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
                <div className="flex justify-between items-center mt-4">
                    <h1 className="text-5xl mb-7">{title}</h1>
                    <CategoryLabel>
                        {category}
                    </CategoryLabel>
                </div>
                <img
                    src={cover_image}
                    alt="cover image"
                    className="w-full rounded"
                />

                <div className=" bg-gray-100 flex justify-between items-center p-2 my-8">
                    <div className="flex items-center">
                        <img
                            src={author_image}
                            alt="author_image"
                            className="mx-4 w-10 h-10 object-cover sm:block hidden rounded-full"
                        />
                        <h4>{author}</h4>
                    </div>
                    <div className="mr-4">{date}</div>
                </div>

                <div className="blog-text mt-2">
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}>

                    </div>
                </div>
            </div>
        </Layout>
    )
}


// # Get paths
export const getStaticPaths = async () => {

    const files = fs.readdirSync(path.join('posts'))
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    // console.log(paths);

    return {
        paths,
        fallback: false
    }
}

// # Get params from paths
export const getStaticProps = async ({ params: { slug } }) => {

    const markdownWithMeta = fs.readFileSync(
        path.join('posts', `${slug}.md`),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)
    // console.log(`frontmatter: ${frontmatter}`, `content: ${content}`);

    return {
        props: {
            frontmatter,
            content,
            slug
        }
    }
}

export default Blog