'use client';

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
import { useForm } from 'react-hook-form';

function SignUp() {
  const { register, handleSubmit } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    defaultValues: { name: '', email: '', password: '' },
  });

  const searchParams = useSearchParams()
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    router.push('/auth/signin');
  });

  return (
    <Flex className="h-[30rem]" justify="center" align="center">
      <Card className="w-[22rem]" size="3">
        <Flex
          className="text-center"
          direction="column"
          justify="center"
          gap="4"
        >
          <Heading as="h1" size="4">
            Sign Up
          </Heading>
          <form onSubmit={onSubmit}>
            <Flex direction="column" gap="3">
              <TextField.Root>
                <TextField.Input
                  type="name"
                  placeholder="Name"
                  {...register('name')}
                />
              </TextField.Root>
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
          <Box>
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
