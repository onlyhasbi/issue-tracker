'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const navbars = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues' },
];

function NavBar() {
  const currentPath = usePathname();

  return (
    <nav className="flex gap-6 px-5 mb-5 h-14 items-center border-b">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-3">
        {navbars?.map((nav) => (
          <Link
            key={nav.label}
            className={classNames({
              'text-zinc-900': nav.href === currentPath,
              'text-zinc-500': currentPath !== nav.href,
              'hover:text-zinc-800 transition-colors': true,
            })}
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
