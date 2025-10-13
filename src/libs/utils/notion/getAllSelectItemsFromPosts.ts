import { TPosts, TTagItem } from "@/src/types"

export function getAllSelectItemsFromPosts(
  key: "tags" | "category",
  posts: TPosts
) {
  const itemObj: { [itemName: string]: number } = {}

  if (!posts || posts.length === 0) {
    return itemObj
  }

  posts.forEach((post) => {
    if (key === "tags" && post.tags) {
      post.tags.forEach((tag: TTagItem) => {
        const tagName = tag.name // Extrair apenas o nome da tag
        if (tagName in itemObj) {
          itemObj[tagName]++
        } else {
          itemObj[tagName] = 1
        }
      })
    } else if (key === "category" && post.category) {
      const categoryName = post.category // category já é string
      if (categoryName in itemObj) {
        itemObj[categoryName]++
      } else {
        itemObj[categoryName] = 1
      }
    }
  })

  return itemObj
}
