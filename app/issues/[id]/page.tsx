import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';

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
      issue page {issue.title} {issue.description} {issue.status}{' '}
      {issue.createdAt.toDateString()}
    </div>
  );
}

export default IssueDetail;
