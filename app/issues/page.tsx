import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

function IssuePage() {
  return (
    <div>
      <p>IssuePage</p>
      <Button variant="solid">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}

export default IssuePage;
