export type TPostStatus = "Private" | "Public" | "PublicOnDetail"
export type TPostType = "Post" | "Paper" | "Page"

// Novo tipo para um item de tag individual
export type TTagItem = {
  id: string
  name: string
  color: string
}

export type TPost = {
  id: string
  date: { start_date: string }
  type: TPostType // Corrigido para string
  slug: string
  tags?: TTagItem[] // Corrigido para array de TTagItem
  category?: string // Corrigido para string
  summary?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[] // Autor ainda pode ser um array de pessoas da API, mesmo que peguemos apenas o nome
  title: string
  status: TPostStatus // Corrigido para string
  createdTime: string
  fullWidth: boolean
  thumbnail?: string | null // Corrigido para string | null
  updatedAt: string
}

export type TPosts = TPost[]

export type TTags = {
  [tagName: string]: number // Continua sendo nome da tag (string) -> contagem
}
export type TCategories = {
  [category: string]: number // Continua sendo nome da categoria (string) -> contagem
}

export type ThemeType = "dark" | "light"
