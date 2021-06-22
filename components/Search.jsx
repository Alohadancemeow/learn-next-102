import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchResults from './SearchResults'

const Search = () => {

    // # States
    const [searchTerm, setSearchTerm] = useState()
    const [searchResults, setSearchResults] = useState([])


    useEffect(() => {

        const getResults = async () => {
            if (!searchTerm) {
                setSearchResults([])
            } else {
                // Fetching for search data
                const res = await fetch(`/api/search?q=${searchTerm}`)
                const { results } = await res.json()
                // console.log(results);
                setSearchResults(results)
            }
        }

        getResults()

    }, [searchTerm])

    return (
        <div className="relative p-4 bg-gray-600">
            <div className="container flex items-center justify-center mx-auto md:justify-end">
                <div className="relative text-gray-600 w-72">
                    <form>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search Posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-10 px-5 pr-10 text-sm bg-white rounded-full focus:outline-none w-72"
                        />

                        <FaSearch
                            className="absolute top-0 right-0 mt-3 mr-4 text-black"
                        />
                    </form>
                </div>
            </div>

            <SearchResults results={searchResults} />
        </div>
    )
}

export default Search
