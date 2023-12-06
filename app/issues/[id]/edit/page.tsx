import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamicNext from 'next/dynamic';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

const IssueForm = dynamicNext(
  async () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

async function EditIssuePage({ params: { id } }: { params: { id: string } }) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}

export const dynamic = 'force-dynamic';

export default EditIssuePage;
