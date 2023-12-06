import { Skeleton } from '@/app/components';

function IssueFormSkeleton() {
  return (
    <div className="max-w-xl">
      <Skeleton height="2rem" />
      <div className="pt-3 pb-5">
        <Skeleton height="20rem" />
      </div>
      <Skeleton width="3rem" height="1.5rem" />
    </div>
  );
}

export default IssueFormSkeleton;
