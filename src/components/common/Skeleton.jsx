import React from 'react';
import PropTypes from 'prop-types';

function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
};

Skeleton.defaultProps = {
  className: '',
};

function ThreadItemSkeleton() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-3" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
      <div className="flex space-x-4 pt-2">
        <Skeleton className="w-16 h-8 rounded-lg" />
        <Skeleton className="w-16 h-8 rounded-lg" />
        <Skeleton className="w-16 h-8 rounded-lg" />
      </div>
    </div>
  );
}

function ThreadDetailSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 space-y-6">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
        <Skeleton className="w-3/4 h-10" />
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-40 h-5" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>
        <div className="flex items-center space-x-6 pt-4">
          <Skeleton className="w-24 h-10 rounded-xl" />
          <Skeleton className="w-24 h-10 rounded-xl" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="w-48 h-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex space-x-4"
            >
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center space-x-4"
        >
          {/* Rank Icon Skeleton */}
          <div className="shrink-0">
            <Skeleton className="w-6 h-6 rounded-md" />
          </div>

          {/* Avatar Skeleton */}
          <Skeleton className="w-12 h-12 rounded-full shrink-0" />

          {/* Name and Email Skeleton */}
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-48 h-4" />
          </div>

          {/* Score Skeleton */}
          <div className="text-right shrink-0 space-y-1">
            <Skeleton className="w-12 h-8 ml-auto" />
            <Skeleton className="w-10 h-3 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopContributorsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="w-8 h-4" />
        </div>
      ))}
    </div>
  );
}

export {
  Skeleton,
  ThreadItemSkeleton,
  ThreadDetailSkeleton,
  LeaderboardSkeleton,
  TopContributorsSkeleton,
};
