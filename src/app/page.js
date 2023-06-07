import { SanityClient } from '@sanity/client'
import { PostCard, PostWidgets, Categories } from '../components'

export default function Home({ _id }) {
  // console.log(_id)
  return (
    <main className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          {_id?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative top-8 lg:sticky'>
            <PostWidgets />
            <Categories />
          </div>
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
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

  const client = new SanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
  })

  try {
    const posts = await client.fetch(query)
    console.log('Fetched Posts:', posts)
    return {
      props: { posts },
    }
  } catch (error) {
    console.log('Error:', error)
    return {
      props: { posts: [] }, // Provide an empty array as a fallback
    }
  }
}
