import { ReaderIcon, RocketIcon } from '@radix-ui/react-icons';
import Link from "next/link";

export default function SideNavigation() {
  return (
    <aside className="w-3/12 border-r border-gray-300 h-screen p-5">
      <div>
        <h1 className="font-bold text-lg">Portafolio admin</h1>
      </div>
      {/* <span className="border-b block mt-2"></span> */}
      <div className="mt-4">
        <ul>
          <li>
            <Link
              href={"/admin/projects"}
              className="transition ease-in-out delay-150 duration-300 hover:bg-gray-100 px-3 py-2 rounded text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <RocketIcon />
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/blogs"}
              className="transition ease-in-out delay-150 duration-300 hover:bg-gray-100 px-3 py-2 rounded text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <ReaderIcon />
              <span>Blogs</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
