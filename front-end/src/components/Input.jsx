import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition";

  return (
    <div className="flex flex-col gap-1.5 my-4">
      <label className="text-sm font-semibold text-gray-600">
        {label}
      </label>

      {textarea ? (
        <textarea
          ref={ref}
          rows="4"
          className={`${classes} resize-none`}
          {...props}
        />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </div>
  );
});

export default Input;

