import { Box, Flex, Grid } from '@radix-ui/themes';
import LatestIssue from './LatestIssue';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';
import IssueChart from './IssueChart';
import { Metadata } from 'next';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const statistic = { open, inProgress, closed };

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5" justify="between">
        <IssueSummary statistic={statistic} />
        <IssueChart statistic={statistic} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
