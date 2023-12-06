import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '@/app/issues/_components/IssueForm';

async function EditIssuePage({ params: { id } }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}

export const dynamic = 'force-dynamic'

export default EditIssuePage;
