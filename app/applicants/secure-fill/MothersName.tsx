import { FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";

interface MothersNameProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}
const MothersName: FC<MothersNameProps> = ({
  form,
  setForm,
  setErrors,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Mother's First Name</label>
        <input
          value={form.motherFirst}
          onChange={(e) => setForm({ ...form, motherFirst: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="motherFirst"
        />

        {errors.motherFirst && (
          <p className="text-red-600 text-sm">{errors.motherFirst}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Mother's Last Name</label>
        <input
          type="text"
          value={form.motherLast}
          onChange={(e) => setForm({ ...form, motherLast: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="motherLast"
        />
        {errors.motherLast && (
          <p className="text-red-600 text-sm">{errors.motherLast}</p>
        )}
      </div>
    </div>
  );
};
export default MothersName;
