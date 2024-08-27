'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './header.module.css';

const Header: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    // Implement sign out logic here
    // For example, if using Supabase:
    // await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Your App Name</div>
      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.navLink}>
          Dashboard
        </Link>
        <Link href="/worktracker" className={styles.navLink}>
          Work Tracker
        </Link>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
