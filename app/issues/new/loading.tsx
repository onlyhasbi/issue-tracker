import { Skeleton } from '@/app/components';

function LoadingNewIssue() {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <div className="py-5">
        <Skeleton count={5} />
      </div>
      <Skeleton width="3rem" />
    </div>
  );
}

export default LoadingNewIssue;
