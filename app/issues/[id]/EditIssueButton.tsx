import Link from 'next/link';
import { Button } from '@radix-ui/themes';
import { AiOutlineForm } from 'react-icons/ai';

function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <AiOutlineForm />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
}

export default EditIssueButton;
