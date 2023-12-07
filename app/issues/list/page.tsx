import { IssuesBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Box, Table, Text } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { AiOutlineUp } from 'react-icons/ai';

type Props = {
  searchParams: { status: Status; orderBy: keyof Issue };
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  {
    label: 'Created At',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

async function IssuePage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy =
    searchParams.orderBy &&
    columns.map((column) => column.value).includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: 'asc' }
      : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });

  return (
    <Box className="space-y-5">
      <IssueAction />

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
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
    </Box>
  );
}

export const dynamic = 'force-dynamic';

export default IssuePage;
