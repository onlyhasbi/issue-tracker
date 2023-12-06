'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { Box, Container, Flex } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const navbars = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues/list' },
];

function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="flex mb-5 h-14 items-center border-b">
      <Container>
        <Flex gap="5" align="center">
          <Link href="/">
            <AiFillBug />
          </Link>
          <ul className="flex gap-3">
            {navbars?.map((nav) => (
              <li key={nav.label}>
                <Link
                  className={classNames({
                    'text-zinc-900': nav.href === currentPath,
                    'text-zinc-500': currentPath !== nav.href,
                    'hover:text-zinc-800 transition-colors': true,
                  })}
                  href={nav.href}
                >
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
          <Box>
            {status === 'authenticated' ? (
              <Link href="/api/auth/signout">Logout</Link>
            ) : (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
