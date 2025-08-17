
import React, { useState } from "react";

export interface Column<Person> {
  key: string;
  title: string;
  dataIndex: keyof Person;
  sortable?: boolean;
}

export interface DataTableProps<Person> {
  data: Person[];
  columns: Column<Person>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: Person[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const direction = sortConfig?.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSelect = (row: T) => {
    let updatedSelection: T[];
    if (selectedRows.includes(row)) {
      updatedSelection = selectedRows.filter((r) => r !== row);
    } else {
      updatedSelection = selectable === true ? [...selectedRows, row] : [row];
    }
    setSelectedRows(updatedSelection);
    onRowSelect?.(updatedSelection);
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      {loading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : data.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No data available</div>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {selectable && <th className="p-2"></th>}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-2 text-left cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  {col.title}
                  {col.sortable && (
                    <span className="ml-1 text-xs">⇅</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleSelect(row)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
