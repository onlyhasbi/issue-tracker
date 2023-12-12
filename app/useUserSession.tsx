'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const useUserSession = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  return {
    isRedirectHome:
      session && ['signin', 'signup'].some((path) => pathname.includes(path)),
    redirectToHome: () => router.push('/'),
  };
};

export default useUserSession;
