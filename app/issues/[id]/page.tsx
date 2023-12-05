import { IssuesBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import MarkDown from 'react-markdown';

type Props = {
  params: {
    id: string;
  };
};

async function IssueDetail({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssuesBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <MarkDown>{issue.description}</MarkDown>
      </Card>
    </div>
  );
}

export default IssueDetail;
