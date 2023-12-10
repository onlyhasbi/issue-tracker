import prisma from '@/prisma/client';
import { Box, Grid, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetail';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import AssigneSelect from './AssigneSelect';
import { cache } from 'react';

type Props = {
  params: {
    id: string;
  };
};

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex direction="column" gap="3">
          <AssigneSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: 'Detail of issue ' + issue?.id,
  };
}

export default IssueDetailPage;
