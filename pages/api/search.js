// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function handler(req, res) {

  let posts

  if (process.env.NODE_ENV === 'production') {
    // todo: fetch from cache

  } else {
    // Read paths
    const files = fs.readdirSync(path.join('posts'))

    // Read file,
    posts = files.map(filename => {

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
  }

  // filter title, excerpt, category that contains query(q)
  const results = posts.filter(({ frontmatter: { title, excerpt, category } }) => (
    title.toLowerCase().indexOf(req.query.q) != -1 ||
    excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
    category.toLowerCase().indexOf(req.query.q) != -1

  ))

  // console.log(results);

  res.status(200).json(JSON.stringify({ results }))
}
