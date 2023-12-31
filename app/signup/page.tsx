'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorMessage } from '../components';
import useUserSession from '../useUserSession';

const signUpSchema = z.object({
  name: z.string().min(1,"Name required").min(3, 'Name character min. 3'),
  email: z.string().min(1,"Email required").email({message:'Incorrect email'}),
  password: z.string().min(1,"Password required").min(5, 'Password too weak'),
});

function SignUp() {
  const { isRedirectHome, redirectToHome } = useUserSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    router.push('/auth/signin');
  });

  useEffect(() => {
    if (isRedirectHome) {
      redirectToHome();
    }
  }, [isRedirectHome]);

  if (isRedirectHome) return null;

  return (
    <Flex className="h-[30rem]" justify="center" align="center">
      <Card className="w-[22rem]" size="3">
        <Flex direction="column" justify="center" gap="4">
          <Heading as="h1" size="4" className="text-center">
            Sign Up
          </Heading>
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
              <Box className="space-y-1">
                <TextField.Root>
                  <TextField.Input
                    type="name"
                    placeholder="Name"
                    {...register('name')}
                  />
                </TextField.Root>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              </Box>
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
                Sign Up
              </Button>
            </Flex>
          </form>
          <Button
            color="blue"
            variant="surface"
            className="block w-full text-center cursor-pointer"
            onClick={() =>
              signIn('google', {
                redirect: true,
                callbackUrl: searchParams.get('callbackUrl')?.toString() || '/',
              })
            }
          >
            Sign Up with Google
          </Button>
          <Box className="text-center">
            <Text size="2">Have an account?</Text>
            <Link className="text-sm ml-1 hover:underline" href="/auth/signin">
              Sign In
            </Link>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
}

export default SignUp;
