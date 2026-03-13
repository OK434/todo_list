import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {

  const classes =
"w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer";

  return (
    <div className="flex flex-col gap-2 mb-5">

      <label className="text-sm font-medium text-gray-700">
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

        <input
          ref={ref}
          className={classes}
          {...props}
        />

      )}

    </div>
  );
});

export default Input;
