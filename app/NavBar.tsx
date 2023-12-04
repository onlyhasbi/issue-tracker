'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const navbars = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issue' },
];

const isActive = (current: string, selected: string) => current === selected;

function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 px-5 mb-5 h-14 items-center border-b">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-3">
        {navbars.map((nav) => (
          <Link
            key={nav.label}
            className={
              `${isActive(nav.href, pathname) ? 'text-zinc-800' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`
            }
            href={nav.href}
          >
            {nav.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
