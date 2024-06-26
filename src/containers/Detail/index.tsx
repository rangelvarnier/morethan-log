import { TPost } from "@/src/types"
import useMermaidEffect from "./hooks/useMermaidEffect"
import useReadTimeEffect from "./hooks/useReadTimeEffect"
import PostDetail from "./components/PostDetail"
import PageDetail from "./components/PageDetail"

type Props = {
  blockMap: any
  data: TPost
}

const Detail: React.FC<Props> = ({ blockMap, data }) => {
  useMermaidEffect()
  useReadTimeEffect()

  return (
    <div>
      {data.type[0] === "Page" && (
        <PageDetail data={data} blockMap={blockMap} />
      )}
      {data.type[0] !== "Page" && (
        <PostDetail data={data} blockMap={blockMap} />
      )}
    </div>
  )
}

export default Detail
