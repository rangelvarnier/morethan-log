import Header from "./Header"
import PropTypes from "prop-types"
import MetaConfig, { MetaConfigProps } from "./MetaConfig"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

type Props = {
  children: React.ReactNode
  metaConfig: MetaConfigProps
  fullWidth?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  metaConfig,
  fullWidth = false,
}) => {
  return (
    <div>
      <MetaConfig {...metaConfig} />
      <div className={`wrapper`}>
        {metaConfig.type !== "Paper" && <Header fullWidth={fullWidth} />}
        <main
          className={`m-auto flex-grow w-full transition-all max-w-6xl px-4 ${
            fullWidth && "px-4 md:px-24"
          } ${metaConfig.type === "Paper" && "py-10"} `}
        >
          {children}
          <Analytics/>
          <SpeedInsights/>
        </main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
