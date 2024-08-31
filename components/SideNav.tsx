import React from 'react';
import Link from 'next/link';

const SideNav: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/board" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Board
          </Link>
        </li>
        <li>
          <Link href="/taskboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Taskboard
          </Link>
        </li>
        <li>
          <Link href="/profile" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;