'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { LuInfo } from 'react-icons/lu';
import SimpleMDE from 'react-simplemde-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueSchema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof issueSchema>;

function NewIssuePage() {
  const [error, setError] = useState('');
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

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      error && setError('An expected error occured');
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
        <div className="space-y-1">
          <TextField.Input placeholder="Title" {...register('title')} />
          {errors.title && <Text color="red" size="2" as="p">{errors.title.message}</Text>}
        </div>
        <div className="space-y-1">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          {errors.description && (
            <Text color="red" size="2"  as="p">{errors.description.message}</Text>
          )}
        </div>
        <Button variant="solid">Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
