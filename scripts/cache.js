const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postData = () => {

    // Read paths
    const files = fs.readdirSync(path.join('posts'))

    // Read files
    const posts = files.map(filename => {

        // Get slug
        const slug = filename.replace('.md', '')

        // Read file data
        const markdownWithMeta = fs
            .readFileSync(path.join('posts', filename), 'utf-8')

        // Then get file header
        const { data: frontmatter } = matter(markdownWithMeta)

        return {
            slug,
            frontmatter
        }
    })

    return `export const posts = ${JSON.stringify(posts)}`
}

// # Create cache folder, if not exits.
try {
    fs.readdirSync('cache')
} catch (error) {
    fs.mkdirSync('cache')
}

// # Create cache/data.js file,
// # With datas that received from postData().
fs.writeFile('cache/data.js', postData(), (err) => {
    if (err) return console.log(err);
    console.log('Post cached..');
})