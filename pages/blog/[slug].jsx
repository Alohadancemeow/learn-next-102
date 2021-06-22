import React from 'react'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'
import Image from 'next/image'

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

            <div className="w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-5xl mb-7">{title}</h1>
                    <CategoryLabel>
                        {category}
                    </CategoryLabel>
                </div>
                <Image
                    src={cover_image}
                    alt="cover image"
                    width={1300}
                    height='auto'
                    className="w-full rounded"
                />

                <div className="flex items-center justify-between p-2 my-8 bg-gray-100 ">
                    <div className="flex items-center">
                        <Image
                            // src={author_image}
                            src={cover_image}
                            width={40}
                            height={40}
                            alt="author_image"
                            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                        />
                        <h4>{author}</h4>
                    </div>
                    <div className="mr-4">{date}</div>
                </div>

                <div className="mt-2 blog-text">
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
