import Link from "next/link"

const NavBar: React.FC = () => {
  const links = [{ id: 1, name: "Sobre", to: "/about" }]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map((link) => (
          <li
            key={link.id}
            className="block ml-4 text-black text-gray-500 dark:text-white nav"
          >
            <Link href={link.to}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar
