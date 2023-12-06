import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const IssueForm = dynamic(
  async () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
  }
);

async function EditIssuePage({ params: { id } }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
