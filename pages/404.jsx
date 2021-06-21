import React from 'react'
import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'

const NotFoundPage = () => {
    return (
        <Layout title="Page Not Found">
            <div className="flex flex-col mt-20 items-center">
                <Image src='/favicon.ico'
                    alt="404 not found"
                    width={70}
                    height={70}
                    className="bg-gray-800 rounded-2xl"
                />

                <h1 className="text-6xl my-5">Whoops!</h1>
                <h2 className="text-4xl text-gray-400 mb-5">
                    This page does not exits.
                </h2>
                <Link href="/">
                    <a className="cursor-pointer uppercase hover:text-indigo-300">
                        back to home
                    </a>
                </Link>

            </div>
        </Layout>
    )
}

export default NotFoundPage
