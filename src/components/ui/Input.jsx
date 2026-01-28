export default function Input({ label, error, ...props }) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full px-4 py-3 rounded-xl border-2 
          ${error ? 'border-red-500' : 'border-gray-200'}
          focus:border-primary-500 focus:ring-2 focus:ring-primary-200
          transition-all outline-none
        `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
