export interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export interface SettingItem {
  key: string;
  label: string;
  type: 'toggle' | 'input' | 'select';
  options?: string[];
}

const appConfig = {
  appName: 'Your App Name',
  navItems: [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/board', label: 'Board', icon: '📋' },
    { href: '/chat', label: 'Chat', icon: '💬' },
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ] as NavItem[],
  settings: [
    { key: 'theme', label: 'Dark Mode', type: 'toggle' },
    { key: 'language', label: 'Language', type: 'select', options: ['English', 'Spanish', 'French'] },
    { key: 'notifications', label: 'Enable Notifications', type: 'toggle' },
  ] as SettingItem[],
};

export default appConfig;