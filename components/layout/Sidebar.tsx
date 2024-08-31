'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import appConfig from '@/config/appConfig';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
	const pathname = usePathname();
	const [isMinimized, setIsMinimized] = useState(false);

	const toggleMinimize = () => {
		setIsMinimized(!isMinimized);
	};

	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={onClose}
				></div>
			)}
			
			{/* Sidebar */}
			<nav className={`
				fixed top-0 left-0 bottom-0 flex flex-col py-6
				overflow-y-auto transition-all transform 
				${isOpen ? 'translate-x-0' : '-translate-x-full'}
				${isMinimized ? 'w-16' : 'w-64'}
				lg:translate-x-0 lg:static lg:max-w-none lg:z-auto
				z-50
				bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white
			`}>
				<div className={`flex items-center justify-between mb-8 ${isMinimized ? 'px-2' : 'px-6'}`}>
					{!isMinimized && <div className="text-2xl font-bold">{appConfig.appName}</div>}
					<button
						onClick={toggleMinimize}
						className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
					>
						{isMinimized ? '➡️' : '⬅️'}
					</button>
				</div>
				<ul>
					{appConfig.navItems.map((item) => (
						<li key={item.href} className="mb-2">
							<Link 
								href={item.href}
								className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
									pathname === item.href ? 'bg-gray-200 dark:bg-gray-700' : ''
								} ${isMinimized ? 'justify-center' : 'px-6'}`}
								onClick={onClose}
							>
								<span className="mr-2">{item.icon}</span>
								{!isMinimized && item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default Sidebar;