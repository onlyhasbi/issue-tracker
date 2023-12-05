'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LuInfo } from 'react-icons/lu';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import delay from 'delay';

type IssueForm = z.infer<typeof issueSchema>;

async function NewIssuePage() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setIsSubmitting(false);
      error && setError('An expected error occured');
    }
  });

  await delay(2000);

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <LuInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className="max-w-xl space-y-3">
        <div className="space-y-1">
          <TextField.Input placeholder="Title" {...register('title')} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div className="space-y-1">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button variant="solid" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Submit Issue
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
