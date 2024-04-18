import React from "react"
import Link from "next/link"
import { CONFIG } from "site.config"
import Image from "next/image"

type Props = {}

const Logo: React.FC<Props> = () => {
  return (
    <Link href="/" aria-label={CONFIG.blog.title}>

        <div className="flex items-center">
        <Image
          src={CONFIG.profile.image}
          width={45}
          height={45}
          alt="profile_image"
          className="relative"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
          <div className="ml-2 text-black dark:text-white header-name">
            {CONFIG.blog.title}
          </div>
        </div>

      </Link>
  );
}

export default Logo
