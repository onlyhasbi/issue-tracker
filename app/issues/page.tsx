import prisma from '@/prisma/client';
import { Button, Table, Text } from '@radix-ui/themes';
import Link from 'next/link';

async function IssuePage() {
  const issues = await prisma.issue.findMany();

  return (
    <div className="space-y-5">
      <Text as="p" size="5">
        Issues
      </Text>

      <Button variant="solid">
        <Link href="/issues/new">New Issue</Link>
      </Button>

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
                {issue.title}
                <div className="block md:hidden">{issue.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status}
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
