export default function Form({ fields, onSubmit, initialValues }: { 
    fields: { name: string; label: string; type: string }[];
    onSubmit: (data: any) => void;
    initialValues?: any;
  }) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData);
          onSubmit(data);
        }}
        className="space-y-4 bg-white p-6 shadow-md rounded-lg"
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              defaultValue={initialValues?.[field.name] || ""}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Lưu
        </button>
      </form>
    );
  }
  