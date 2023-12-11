'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { status } from './issues/_components/IssueForm';

function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status !== 'ALL') {
          params.append('status', status);
        }

        if (searchParams.get('orderBy')) {
          params.append('orderBy', searchParams.get('orderBy')!);
        }

        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          <Select.Label></Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || ''}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}



const statuses: { label: string; value?: Status | 'ALL' }[] = [
  {
    label: 'All',
    value: 'ALL',
  },
  ...status,
];

export default IssueStatusFilter;
