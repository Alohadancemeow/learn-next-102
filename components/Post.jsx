import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CategoryLabel from './CategoryLabel'

const Post = ({ post, key, compact }) => {
    return (
        <div key={key} className="w-full px-10 py-6 mt-6 bg-white rounded-lg shadow-md">

            {!compact && (
                <Image
                    src={post.frontmatter.cover_image}
                    alt="post image"
                    width={600}
                    height={420}
                    className="mb-4 rounded"
                />
            )}

            <div className="flex items-center justify-between">
                <span className="font-light text-gray-600">
                    {post.frontmatter.date}
                </span>
                <CategoryLabel>
                    {post.frontmatter.category}
                </CategoryLabel>
            </div>

            <div className="mt-2">
                <Link href={`/blog/${post.slug}`}>
                    <a className="text-2xl font-bold text-gray-700 hover:underline">
                        {post.frontmatter.title}
                    </a>
                </Link>
                <p className="mt-2 text-gray-600">
                    {post.frontmatter.excerpt}
                </p>
            </div>

            {!compact && (
                <div className="flex items-center justify-between mt-6 ">
                    <Link href={`/blog/${post.slug}`}>
                        <a className="text-gray-900 hover:text-blue-600">
                            Read more
                        </a>
                    </Link>

                    <div className="flex items-center">
                        <Image
                            // src={post.frontmatter.author_image} //! Not working on production
                            src={post.frontmatter.cover_image}
                            alt="author_image"
                            width={40}
                            height={40}
                            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
                        />
                        <h3 className="font-bold text-gray-700">
                            {post.frontmatter.author}
                        </h3>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Post
