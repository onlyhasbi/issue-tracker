'use client';

import useUserSession from '@/app/useUserSession';
import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineInfoCircle } from 'react-icons/ai';

function SignIn() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: '', password: '' },
  });

  const searchParams = useSearchParams();

  const signInError = searchParams.get('error');
  const errorInfo = (info: string) => {
    switch (info) {
      case 'CredentialsSignin':
        return 'Invalid Credentials';
      case 'pchstr must be a non-empty string':
        return 'Credential not registered';
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: searchParams.get('callbackUrl')?.toString() || '/',
    });
  });

  const { isRedirectHome, redirectToHome } = useUserSession();

  useEffect(() => {
    if (isRedirectHome) {
      redirectToHome();
    }
  }, [isRedirectHome]);

  return (
    <Flex className="h-[30rem]" justify="center" align="center">
      <Box>
        {signInError && (
          <Callout.Root color="red" variant="soft" mb="3">
            <Callout.Icon>
              <AiOutlineInfoCircle />
            </Callout.Icon>
            <Callout.Text>
              Sign In Failed. {errorInfo(signInError)}
            </Callout.Text>
          </Callout.Root>
        )}
        <Card className="w-[22rem]" size="3">
          <Flex
            className="text-center"
            direction="column"
            justify="center"
            gap="4"
          >
            <Heading as="h1" size="4">
              Sign In
            </Heading>
            <form onSubmit={onSubmit}>
              <Flex direction="column" gap="3">
                <TextField.Root>
                  <TextField.Input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                  />
                </TextField.Root>
                <TextField.Root>
                  <TextField.Input
                    type="password"
                    placeholder="Password"
                    {...register('password')}
                  />
                </TextField.Root>
                <Button className="cursor-pointer" type="submit">
                  Sign In
                </Button>
              </Flex>
            </form>
            <Button
              color="blue"
              variant="surface"
              className="block w-full text-center cursor-pointer"
              onClick={async () =>
                await signIn('google', {
                  redirect: true,
                  callbackUrl:
                    searchParams.get('callbackUrl')?.toString() || '/',
                })
              }
            >
              Sign In with Google
            </Button>
            <Box>
              <Text size="2">Not registered yet?</Text>
              <Link className="text-sm ml-1 hover:underline" href="/signup">
                Sign Up
              </Link>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}

export default SignIn;
