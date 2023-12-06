import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../_components/IssueFormSkeleton';

const IssueForm = dynamic(
  async () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;
