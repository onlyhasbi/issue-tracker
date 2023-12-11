import { IssuesBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Table, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { AiOutlineUp } from 'react-icons/ai';

export type IssueQuery = { status: Status; orderBy: keyof Issue; page: string };

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.RowHeaderCell
              key={column.value}
              className={column.className || ''}
            >
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}
                className="flex gap-3 items-center"
              >
                <Text>{column.label}</Text>
                {searchParams.orderBy === column.value && <AiOutlineUp />}
              </NextLink>
            </Table.RowHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <NextLink className="hover:underline" href={`/issues/${issue.id}`}>{issue.title}</NextLink>
              <div className="block mt-1 md:hidden">
                <IssuesBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssuesBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  {
    label: 'Created At',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
