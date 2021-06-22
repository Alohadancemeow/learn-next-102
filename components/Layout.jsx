import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Search from './Search'

const Layout = ({ title, keywords, description, children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <Search />
            <main className="container mx-auto my-3">{children}</main>

        </div>
    )
}

export default Layout

Layout.defaultProps = {
    title: 'Wellcome to Myblog',
    keywords: 'development, coding, programming',
    description: 'The best info and news in development'
}
