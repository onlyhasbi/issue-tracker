import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import { AiOutlineForm } from 'react-icons/ai';

function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red">
      <AiOutlineForm />
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
}

export default DeleteIssueButton;
