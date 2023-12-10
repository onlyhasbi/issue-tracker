'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { Spinner } from '@/app/components';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AiOutlineForm } from 'react-icons/ai';

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const route = useRouter();
  const [isError, setIsError] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const handleDeleteIssue = async () => {
    try {
      setIsDelete(true);
      await axios.delete(`/api/issues/${issueId}`);
      route.push('/issues/list');
      route.refresh();
    } catch (error) {
      setIsDelete(false);
      setIsError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" variant="solid" disabled={isDelete}>
            <AiOutlineForm />
            {isDelete && <Spinner />}
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
              <Button color="red" variant="solid" onClick={handleDeleteIssue}>
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
      <AlertDialog.Root open={isError}>
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
              onClick={() => setIsError(false)}
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
