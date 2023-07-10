import React from 'react';

type BattleSummaryProps = {
  summaryArr: string[];
}

const BattleSummary = ({ summaryArr }: BattleSummaryProps) => {
  return (
    <div className="max-h-400 overflow-y-auto max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-10 flex flex-col items-center pb-10">
      <h5 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
        Battle summary
      </h5>
      {summaryArr.map((summary, index) => (
        <span key={index} className="mb-2 text-sm text-gray-500 dark:text-gray-400 w-full">
          {summary}
        </span>
      ))}
  </div>
  )
}

export default BattleSummary;