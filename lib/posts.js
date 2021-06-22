import fs from "fs"
import path from "path"
import matter from 'gray-matter'
import { sortByDate } from '../utils'


// Read post's path [.md]
const files = fs.readdirSync(path.join('posts'))

export const getPosts = () => {

    const posts = files.map((filename) => {

        // Create slug
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

    return posts.sort(sortByDate)
}
