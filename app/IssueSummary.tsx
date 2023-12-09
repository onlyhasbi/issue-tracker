import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

function IssueSummary({ open, inProgress, closed }: Props) {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction="column" gap="4">
            <Link
              className="text-sm font-medium"
              href={`/issues/list/?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text className="font-bold" size="7">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;
