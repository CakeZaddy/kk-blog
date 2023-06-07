import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-06-05',
})

export const getPosts = async () => {
  const query = `*[_type == "post"]{
  _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
}`

  const posts = await client.fetch(query)

  return posts
}
