import Detail from "@containers/Detail"
import { filterPosts } from "@/src/libs/utils/notion"
import Layout from "@components/Layout"
import { CONFIG } from "@/site.config"
import { NextPageWithLayout } from "@pages/_app"
import { TPost } from "../types"
import CustomError from "@containers/CustomError"
import { getPostBlocks, getPosts } from "@libs/apis"

export async function getStaticPaths() {
  const posts = await getPosts()
  const filteredPost = filterPosts(posts, {
    acceptStatus: ["Public", "PublicOnDetail"],
    acceptType: ["Paper", "Post", "Page"],
  })

  return {
    paths: filteredPost.map((row) => `/${row.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    includePages: true
    const posts = await getPosts()
    const post = posts.find((t) => t.slug === slug)
    const blockMap = await getPostBlocks(post?.id!)

    return {
      props: { post, blockMap },
      revalidate: 1,
    }
  } catch (error) {
    return {
      props: {},
      revalidate: 1,
    }
  }
}

type Props = {
  post: TPost
  blockMap: any
}

const DetailPage: NextPageWithLayout<Props> = ({ post, blockMap }) => {
  if (!post) return <CustomError />
  return <Detail blockMap={blockMap} data={post} />
}

DetailPage.getLayout = function getlayout(page) {
  const { post } = page.props as Props

  const getImage = () => {
    if (post?.thumbnail) return post.thumbnail
    if (CONFIG.ogImageGenerateURL)
      return `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(
        post?.title || ""
      )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fmorethan-log.vercel.app%2Flogo-for-dark-bg.svg`
  }

  const getMetaConfig = () => {
    if (!post) {
      return {
        title: CONFIG.blog.title,
        description: CONFIG.blog.description,
        type: "website",
        url: CONFIG.link,
      }
    }
    return {
      title: post.title || CONFIG.blog.title,
      date: new Date(
        post.date?.start_date || post.createdTime || ""
      ).toISOString(),
      image: getImage(),
      description: post.summary || CONFIG.blog.description,
      type: post.type[0],
      url: `${CONFIG.link}/${post.slug}`,
    }
  }
  return (
    <Layout metaConfig={getMetaConfig()} fullWidth={post?.fullWidth}>
      {page}
    </Layout>
  )
}

export default DetailPage
