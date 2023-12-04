'use client';

import { TextField, Button } from '@radix-ui/themes';
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type IssueForm = {
  title: string;
  description: string;
};

function NewIssuePage() {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <TextField.Input placeholder="Title" {...register('title')} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button variant="solid">Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage;
