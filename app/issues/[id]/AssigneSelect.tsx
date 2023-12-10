'use client'

import Skeleton from '@/app/components/Skeleton';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function AssigneSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUser();

  const handleAssignIssue = (userId: string) => {
    axios
      .put('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'unassigned' ? null : userId,
      })
      .catch((e) => {
        toast.error('Changes could not be saved');
      });
  };

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={handleAssignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

const useUser = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(({ data }) => data),
    staleTime: 60 * 60 * 1000 * 24,
  });

export default AssigneSelect;
