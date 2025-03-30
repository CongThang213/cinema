export default function Table({ columns, data }: { columns: string[], data: any[] }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-100 transition">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2">{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  