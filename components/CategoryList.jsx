import React from 'react'
import Link from 'next/link'

const CategoryList = ({ categories }) => {
    return (
        <div className="w-full p-5 mt-6 bg-white rounded-lg shadow-md">
            <h3 className="p-3 text-2xl text-white bg-gray-800 rounded">
                Blog Categories
            </h3>
            <ul className="divide-y divide-gray-300">
                {
                    categories.map((category, index) => (
                        <Link key={index} href={`/blog/category/${category.toLowerCase()}`} >
                            <li className="p-4 cursor-pointer hover:bg-gray-50">
                                {category}
                            </li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default CategoryList
