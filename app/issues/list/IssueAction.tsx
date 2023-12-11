import IssueStatusFilter from '@/app/IssueStatusFilter';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';

function IssueAction() {
  return (
    <Flex gap="4" justify="between">
      <IssueStatusFilter />
      <Button className="cursor-pointer" variant="solid">
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

export default IssueAction;
