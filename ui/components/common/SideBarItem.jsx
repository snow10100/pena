
function SideBarItem({ text, icon, link = "#", className = "" }) {
  return (
    <a
      href={link}
      className={"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 " + className}
    >
      {icon}
      <span className="ms-3">{text}</span>
    </a>
  )
}

export default SideBarItem