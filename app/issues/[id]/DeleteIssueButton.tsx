'use client';

import Link from 'next/link';
import { Button, AlertDialog, Flex } from '@radix-ui/themes';
import { AiOutlineForm } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const route = useRouter()

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <AiOutlineForm />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure want to delete this issue? this action can be undone
        </AlertDialog.Description>
        <Flex mt="3" gap="3" justify="end">
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete(`/api/issues/${issueId}`)
                route.push('/issues')
                route.refresh()
              }}
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default DeleteIssueButton;
