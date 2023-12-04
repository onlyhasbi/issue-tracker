'use client';

import { TextField, TextArea, Button } from '@radix-ui/themes';
import React from 'react';

function NewIssuePage() {
  return (
    <form className="max-w-xl space-y-3">
      <TextField.Input placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button variant="solid">
        Submit New Issue
      </Button>
    </form>
  );
}

export default NewIssuePage;
