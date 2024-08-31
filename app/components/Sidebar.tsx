'use client';

import { Home, Folder, CheckSquare, Users, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const SidebarItem = ({ icon: Icon, href, label }) => {
    const isActive = pathname === href
    return (
      <li>
        <Link
          href={href}
          className={`flex items-center p-2 rounded-lg ${
            isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
          }`}
        >
          <Icon className="w-6 h-6 mr-2" />
          {label}
        </Link>
      </li>
    )
  }

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 z-10`}>
        <div className="mb-6">
          <Link href="/" className="text-2xl font-bold">Your Logo</Link>
        </div>
        <ul className="space-y-2">
          <SidebarItem icon={Home} href="/dashboard" label="Dashboard" />
          <SidebarItem icon={Folder} href="/projects" label="Projects" />
          <SidebarItem icon={CheckSquare} href="/tasks" label="Tasks" />
          <SidebarItem icon={Users} href="/teams" label="Teams" />
        </ul>
      </nav>
    </>
  )
}

export default Sidebar