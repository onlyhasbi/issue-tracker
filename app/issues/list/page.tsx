import Pagination from '@/app/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Box } from '@radix-ui/themes';
import IssueAction from './IssueAction';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import {Metadata} from 'next'

type Props = {
  searchParams: IssueQuery;
};

async function IssuePage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;  

  const orderBy =
    searchParams.orderBy &&
    columnNames.map((column) => column).includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: 'asc' }
      : undefined;

  const where = {
    status,
  };

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Box className="space-y-5">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Box>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};


export default IssuePage;
