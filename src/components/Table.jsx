function Table({ children }) {
  return (
    <div className="bg-secondary-0 overflow-x-auto">
      <table className="border-collapse table-auto w-full min-[800px] text-sm">
        {children}
      </table>
    </div>
  );
}
export default Table;

function TableHeader({ children }) {
  return (
    <thead>
      <tr >{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }) {
  return <tr >{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
