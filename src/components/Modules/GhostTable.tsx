import React from 'react';

export const GhostTable: React.FC = () => {
  return (
    <div className="overflow-x-auto w-full border border-base-content/10 rounded-xl bg-base-100 shadow-sm">
      <table className="table w-full">
        {/* Header implies functionality */}
        <thead>
          <tr className="bg-base-200/50 text-xs uppercase tracking-wider opacity-60">
            <th className="w-1/4">Identifier</th>
            <th className="w-1/4">Status</th>
            <th className="w-1/4">Metric</th>
            <th className="w-1/4 text-right">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="animate-pulse border-b border-base-content/5">
              <td>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-base-300"></div>
                    <div className="h-4 bg-base-300 rounded w-24"></div>
                </div>
              </td>
              <td><div className="h-4 bg-base-300 rounded w-16"></div></td>
              <td><div className="h-4 bg-base-300 rounded w-full max-w-[100px]"></div></td>
              <td><div className="h-4 bg-base-300 rounded w-20 ml-auto"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 text-center text-xs font-mono text-base-content/40 bg-base-200/30">
        Syncing data stream...
      </div>
    </div>
  );
};

export default GhostTable;