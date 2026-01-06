import {
  type Cell,
  getCoreRowModel,
  type Header,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table";

type AppTableProps<T> = {
  options: Omit<TableOptions<T>, "getCoreRowModel">;
};

export const AppTable = <T,>({ options }: AppTableProps<T>) => {
  const table = useReactTable({
    ...options,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;
  const rowsCount = rows.length;

  if (rowsCount === 0) {
    return <div>No data available</div>;
  }

  const renderHeaderCellContent = (header: Header<T, unknown>) => {
    if (header.isPlaceholder) {
      return null;
    }

    const headerDef = header.column.columnDef.header;

    if (typeof headerDef === "function") {
      return headerDef(header.getContext());
    }

    return headerDef;
  };

  const renderCellContent = (cell: Cell<T, unknown>) => {
    const cellDef = cell.column.columnDef.cell;

    if (typeof cellDef === "function") {
      return cellDef(cell.getContext());
    }

    return cellDef;
  };

  const headerGroups = table.getHeaderGroups();

  return (
    <table>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{renderHeaderCellContent(header)}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{renderCellContent(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
