import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import delay from 'delay';
import IssuesBadge from '../components/IssuesBadge';
import IssueAction from './IssueAction';
import Link from 'next/link';

async function IssuePage() {
  const issues = await prisma.issue.findMany();
  await delay(2000);

  return (
    <div className="space-y-5">
    
      <IssueAction />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.RowHeaderCell>Title</Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden md:table-cell">
              Description
            </Table.RowHeaderCell>
            <Table.RowHeaderCell className="hidden md:table-cell">
              Status
            </Table.RowHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} className="hover:underline">{issue.title}</Link>
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
    </div>
  );
}

export default IssuePage;
