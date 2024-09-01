import { useUser } from '@/app/hooks/useUser';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function Logo({ className }: { className?: string }) {
  const { user } = useUser();
  
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/logo.png"
        width={40}
        height={40}
        alt="Logo"
        className="rounded-lg"
      />
      {user && (
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-white rounded-full border border-gray-200 shadow-sm">
          {user.avatar ? (
            <Image
              src={user.avatar}
              width={20}
              height={20}
              alt={user.name || "User"}
              className="rounded-full"
            />
          ) : (
            <span className="text-xs font-semibold">
              {getInitials(user.name)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ... existing code ...

function ProfileDropdown() {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center">
          {user.avatar ? (
            <Image
              src={user.avatar}
              width={32}
              height={32}
              alt={user.name || "User"}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">
                {getInitials(user.name)}
              </span>
            </div>
          )}
        </Menu.Button>
      </div>
      <Transition
        // ... existing transition code ...
      >
        <Menu.Items
          // ... existing menu items code ...
        >
          {/* ... existing menu item contents ... */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

// ... existing code ...

// Add this helper function at the end of the file
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}