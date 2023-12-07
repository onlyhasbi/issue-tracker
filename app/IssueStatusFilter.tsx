'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: { label: string; value?: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];
function IssueStatusFilter() {
  return (
    <Select.Root>
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

export default IssueStatusFilter;
