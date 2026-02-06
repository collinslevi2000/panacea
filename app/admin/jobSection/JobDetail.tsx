"use client";

import useJobStore from "@/app/store/useJobStore";
import React, { useEffect, useState } from "react";

/* ----------------------------- Types ----------------------------- */

interface JobFormData {
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

/* ----------------------- Reusable Components --------------------- */

interface ListEditorProps {
  title: string;
  items: string[];
  editing: boolean;
  onChange: (items: string[]) => void;
  bullet?: string;
}

const ListEditor: React.FC<ListEditorProps> = ({
  title,
  items,
  editing,
  onChange,
  bullet = "•",
}) => {
  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => onChange([...items, ""]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium text-zinc-300">{title}</h2>

      {editing ? (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                className="flex-1 bg-black border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:border-zinc-600 outline-none"
              />

              <button
                onClick={() => removeItem(index)}
                className="px-2 text-zinc-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={addItem}
            className="text-sm text-zinc-400 hover:text-white"
          >
            + Add item
          </button>
        </div>
      ) : (
        <ul className="space-y-2 text-zinc-400">
          {items.map((item, i) => (
            <li key={i}>
              {bullet} {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

/* --------------------------- Main View --------------------------- */

export const JobDetail: React.FC = () => {
  const { selectedJob, updateJob, deleteJob, isSubmitting } = useJobStore();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<JobFormData>({
    description: "",
    responsibilities: [],
    qualifications: [],
  });

  /* ------------------------- Sync Selected Job ------------------------- */

  useEffect(() => {
    if (!selectedJob) return;

    setForm({
      description: selectedJob.description,
      responsibilities: selectedJob.responsibilities,
      qualifications: selectedJob.qualifications,
    });
  }, [selectedJob]);

  /* ---------------------------- Actions ---------------------------- */

  const save = async () => {
    if (!selectedJob) return;
    const ok = await updateJob(selectedJob.id, form);
    if (ok) setEditing(false);
  };

  const remove = async () => {
    if (!selectedJob) return;
    if (!confirm("Delete this job permanently?")) return;
    await deleteJob(selectedJob.id);
  };

  /* ---------------------------- Empty State ---------------------------- */

  if (!selectedJob) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Select a job to view details
      </div>
    );
  }

  /* ---------------------------- Render ---------------------------- */

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex justify-end gap-3 px-8 py-6 border-b border-zinc-800">
          {!editing ? (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-5 py-2 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-900"
              >
                Edit
              </button>

              <button
                onClick={remove}
                className="px-5 py-2 rounded-lg border border-red-600 text-red-500 hover:bg-red-950"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                disabled={isSubmitting}
                onClick={save}
                className="px-5 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditing(false)}
                className="px-5 py-2 rounded-lg border border-zinc-700 text-zinc-400 hover:bg-zinc-900"
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-10 text-zinc-100">
          {/* Description */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-zinc-300">Description</h2>

            {editing ? (
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:border-zinc-600 outline-none"
              />
            ) : (
              <p className="text-zinc-400 whitespace-pre-line">
                {selectedJob.description}
              </p>
            )}
          </section>

          {/* Responsibilities */}
          <ListEditor
            title="Responsibilities"
            items={form.responsibilities}
            editing={editing}
            bullet="▸"
            onChange={(items) =>
              setForm({ ...form, responsibilities: items })
            }
          />

          {/* Qualifications */}
          <ListEditor
            title="Qualifications"
            items={form.qualifications}
            editing={editing}
            bullet="✓"
            onChange={(items) =>
              setForm({ ...form, qualifications: items })
            }
          />
        </div>
      </div>
    </div>
  );
};
