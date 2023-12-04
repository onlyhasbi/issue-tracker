'use client';

import { TextField,  Button } from '@radix-ui/themes';
import React from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewIssuePage() {
  return (
    <form className="max-w-xl space-y-3">
      <TextField.Input placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button variant="solid">
        Submit New Issue
      </Button>
    </form>
  );
}

export default NewIssuePage;
