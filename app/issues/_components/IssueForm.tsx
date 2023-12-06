'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LuInfo } from 'react-icons/lu';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(async () => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
    },
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.put(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
    } catch (error) {
      setIsSubmitting(false);
      error && setError('An expected error occured');
    }
  });

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

      <form onSubmit={onSubmit} className="space-y-3">
        <Box className="space-y-1">
          <TextField.Root>
            <TextField.Input placeholder="Title" {...register('title')} />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </Box>

        <Box className="space-y-1">
          <Controller
            name="description"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <SimpleMDE
                placeholder="Description"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </Box>

        <Button variant="solid" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {issue?.id ? 'Update Issue' : 'Submit Issue'}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
