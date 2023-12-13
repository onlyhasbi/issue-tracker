'use client';

import { ErrorMessage } from '@/app/components';
import useUserSession from '@/app/useUserSession';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { z } from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email required')
    .email({ message: 'Incorrect email' }),
  password: z.string().min(1, 'Password required').min(5, 'Password too weak'),
});

function SignIn() {
  const { isRedirectHome, redirectToHome } = useUserSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const searchParams = useSearchParams();

  const signInError = searchParams.get('error');

  const onSubmit = handleSubmit(async (data) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: searchParams.get('callbackUrl')?.toString() || '/',
    });
  });

  useEffect(() => {
    if (isRedirectHome) {
      redirectToHome();
    }
  }, [isRedirectHome]);

  if (isRedirectHome) return null;

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
          <Flex direction="column" justify="center" gap="4">
            <Heading as="h1" size="4" className="text-center">
              Sign In
            </Heading>
            <form onSubmit={onSubmit}>
              <Flex direction="column" gap="3">
                <Box className="space-y-1">
                  <TextField.Root>
                    <TextField.Input
                      type="email"
                      placeholder="Email"
                      {...register('email')}
                    />
                  </TextField.Root>
                  <ErrorMessage>{errors.email?.message}</ErrorMessage>
                </Box>
                <Box className="space-y-1">
                  <TextField.Root>
                    <TextField.Input
                      type="password"
                      placeholder="Password"
                      {...register('password')}
                    />
                  </TextField.Root>
                  <ErrorMessage>{errors.password?.message}</ErrorMessage>
                </Box>
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
            <Box className="text-center">
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

const errorInfo = (info: string) => {
  switch (info) {
    case 'CredentialsSignin':
      return 'Invalid Credentials';
    case 'pchstr must be a non-empty string':
      return 'Credential not registered';
  }
};

export default SignIn;
