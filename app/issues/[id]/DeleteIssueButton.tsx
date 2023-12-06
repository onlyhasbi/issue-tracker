'use client';

import Link from 'next/link';
import { Button, AlertDialog, Flex } from '@radix-ui/themes';
import { AiOutlineForm } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [error, setError] = useState(false);
  const route = useRouter();

  const handleDeleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      route.push('/issues');
      route.refresh();
    } catch (error) {
      if (error) setError(true);
    }
  };

  return (
    <>
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
              <Button color="red" onClick={handleDeleteIssue}>
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
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              mt="3"
              onClick={() => setError(false)}
            >
              Ok
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteIssueButton;
