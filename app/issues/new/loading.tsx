import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function LoadingNewIssue() {
  return (
    <div className="max-w-xl space-y-3">
      <form className="max-w-xl space-y-3">
        <div className="space-y-1">
          <Skeleton />
        </div>
        <div className="space-y-1">
          <Skeleton />
        </div>
        <Skeleton />
      </form>
    </div>
  );
}

export default LoadingNewIssue;
