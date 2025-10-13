import { Client } from "@notionhq/client"
import { CONFIG } from "site.config"
import { TPosts, TPost, TPostStatus, TPostType } from "@customTypes/index"

declare global {
  var notionDatas: { TPosts: TPosts; savedDate: Date }
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getPosts() {
  if (global?.notionDatas) {
    const saved = global.notionDatas.savedDate
    const now = new Date()
    const diff = (now.getTime() - saved.getTime()) / 1000
    if (diff < 60 * 60) {
      return global.notionDatas.TPosts
    }
  }

  try {
    const databaseId = process.env.NOTION_PAGE_ID as string

    if (!databaseId) {
      console.error("NOTION_PAGE_ID is not defined in environment variables.")
      return []
    }

    const response = await notion.dataSources.query({
      data_source_id: databaseId,
      filter: {
        or: [
          {
            and: [
              {
                property: "status", // Propriedade 'status' do tipo 'Select' (dropdown)
                select: {
                  equals: "Public", // Filtrar por opção 'Public'
                },
              },
              // Adicione outros filtros se necessário, por exemplo, para excluir rascunhos.
              {
                property: "type",
                select: {
                  equals: "Post",
                },
              },
            ],
          },
          {
            and: [
              {
                property: "status", // Propriedade 'status' do tipo 'Select' (dropdown)
                select: {
                  equals: "PublicOnDetail", // Filtrar por opção 'Public'
                },
              },
              {
                property: "type",
                select: {
                  equals: "Page",
                },
              },
            ],
          },
        ],
      },
      sorts: [
        {
          property: "date", // Propriedade 'date' do tipo 'Date'
          direction: "descending",
        },
      ],
      // Ajuste o page_size conforme a necessidade, max é 100
      page_size: 100,
    })

    const posts: TPosts = response.results.map((page: any) => {
      const properties = page.properties
      // console.log( // Removido o console.log de depuração para page.properties
      //   "Raw Notion Page Properties:",
      //   JSON.stringify(properties, null, 2)
      // )

      // Mapeamento das propriedades para o formato TPost
      // Os nomes das propriedades abaixo devem corresponder EXATAMENTE aos nomes no seu banco de dados Notion.
      const post: TPost = {
        id: page.id,
        title: properties.title?.title?.[0]?.plain_text || "", // Corrigido para 'properties.title'
        summary: properties.summary?.rich_text?.[0]?.plain_text || "",
        date: {
          start_date: properties.date?.date?.start || "",
        },
        tags:
          properties.tags?.multi_select.map((tag: any) => ({
            id: tag.id,
            name: tag.name,
            color: tag.color,
          })) || [],
        thumbnail:
          properties.thumbnail?.files?.[0]?.file?.url ||
          properties.thumbnail?.files?.[0]?.external?.url ||
          CONFIG.defaultThumbnail ||
          null,
        slug: properties.slug?.rich_text?.[0]?.plain_text || page.id,
        author: properties.author?.people?.[0]?.name || "", // Nota: 'name' do autor pode exigir chamada adicional à API de usuários
        status: (properties.status?.select?.name as TPostStatus) || "Public", // Corrigido para 'properties.status.select.name' e cast
        type: (properties.type?.select?.name as TPostType) || "Post",
        updatedAt: properties.updatedAt?.last_edited_time || "",
        category: properties.category?.select?.name || "",
        createdTime: new Date(page.created_time).toString(),
        fullWidth: false, // Mantido como false, pois não há propriedade 'fullWidth' no JSON bruto
      }
      return post
    })

    global.notionDatas = { TPosts: posts, savedDate: new Date() }
    // console.log("Mapped Posts (TPosts):", JSON.stringify(posts, null, 2)) // Removido para verificação final
    return posts
  } catch (error) {
    console.error("Error fetching Notion posts from official API:", error)
    return []
  }
}
