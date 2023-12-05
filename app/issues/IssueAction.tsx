import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

type Props = {};

function IssueAction() {
  return (
    <Button variant="solid">
      <Link href="/issues/new">New Issue</Link>
    </Button>
  );
}

export default IssueAction;
