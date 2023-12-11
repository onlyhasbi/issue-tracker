'use client'

import Link from 'next/link';
import classNames from 'classnames';
import {
  Box,
  Container,
  Flex,
  Avatar,
  Text,
  DropdownMenu,
} from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import Skeleton from '@/app/components/Skeleton';

function NavBar() {
  return (
    <nav className="flex mb-5 h-14 items-center border-b">
      <Container>
        <Flex justify="between" align="center">
          <Flex gap="5" align="center">
            <Link href="/" className="mr-5">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className="flex gap-3">
      {links?.map((nav) => (
        <li key={nav.label}>
          <Link
            className={classNames({
              '!text-zinc-900': nav.href === currentPath,
              'nav-link': true,
            })}
            href={nav.href}
          >
            {nav.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );

  return (
    <Box className="ml-auto">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <Flex gap="4" align="center">
            <Avatar
              size="2"
              radius="full"
              src={session!.user!.image!}
              fallback={session!.user!.name!.charAt(0)}
            />
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
