import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import GhostTable from './GhostTable';
import EmptyState from './EmptyState';

interface DataTableProps {
  query_key: string; 
  columns: string[]; 
  title?: string;
}

const DataTable: React.FC<DataTableProps> = ({ query_key, columns = [], title }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay to show off the Ghost Table capacity
      await new Promise(r => setTimeout(r, 1500));

      const hostname = window.location.hostname;
      
      const { data: submissions, error } = await supabase
        .from('universal_submissions')
        .select('data')
        .eq('app_id', hostname)
        .contains('data', { form_id: query_key });

      if (!error && submissions) {
        setData(submissions.map(s => s.data));
      }
      setLoading(false);
    };

    fetchData();
  }, [query_key]);

  if (loading) {
    return (
        <div className="space-y-4">
            {title && <div className="h-6 w-32 bg-base-300 rounded animate-pulse mb-4"></div>}
            <GhostTable />
        </div>
    );
  }

  if (data.length === 0) {
      return <EmptyState type="table" />;
  }

  return (
    <div className="bg-base-100 border border-base-content/10 shadow-sm sm:rounded-lg overflow-hidden">
      {title && (
        <div className="px-6 py-5 border-b border-base-content/5 bg-base-100">
          <h3 className="text-lg leading-6 font-semibold text-base-content">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200/50 text-xs font-semibold uppercase text-base-content/60">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-3 text-left tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-content/5">
            {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-base-200/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col} className="px-6 py-4 whitespace-nowrap text-sm">
                      {typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]}
                    </td>
                  ))}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;