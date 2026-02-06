// components/JobDetail.tsx
import useJobStore from '@/app/store/useJobStore';
import React, { useEffect, useState } from 'react';

export const JobDetail: React.FC = () => {
  const { selectedJob, updateJob, deleteJob, isSubmitting } = useJobStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    responsibilities: [] as string[],
    qualifications: [] as string[],
  });

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        description: selectedJob.description,
        responsibilities: selectedJob.responsibilities,
        qualifications: selectedJob.qualifications,
      });
    }
  }, [selectedJob]);

  const handleSave = async () => {
    if (!selectedJob) return;
    const success = await updateJob(selectedJob.id, formData);
    if (success) setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!selectedJob) return;
    if (!confirm('Delete this job permanently?')) return;
    await deleteJob(selectedJob.id);
  };

  if (!selectedJob) {
    return (
      <div className="text-center py-16 text-zinc-500">
        Select a job to view details
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-end gap-3 px-8 py-6 border-b border-zinc-800">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-900"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg border border-red-600 text-red-500 hover:bg-red-950"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                disabled={isSubmitting}
                onClick={handleSave}
                className="px-5 py-2 rounded-lg bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving…' : 'Save'}
              </button>

              <button
                onClick={() => setIsEditing(false)}
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
          <section>
            <h2 className="text-lg font-medium mb-3 text-zinc-300">
              Description
            </h2>

            {isEditing ? (
              <textarea
                rows={5}
                className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-zinc-100 focus:outline-none focus:border-zinc-600"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            ) : (
              <p className="text-zinc-400 whitespace-pre-line">
                {selectedJob.description}
              </p>
            )}
          </section>

          {/* Responsibilities */}
          <section>
            <h2 className="text-lg font-medium mb-3 text-zinc-300">
              Responsibilities
            </h2>

            {isEditing ? (
              <div className="space-y-3">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="flex-1 bg-black border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none focus:border-zinc-600"
                      value={resp}
                      onChange={(e) => {
                        const updated = [...formData.responsibilities];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, responsibilities: updated });
                      }}
                    />

                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          responsibilities: formData.responsibilities.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                      className="text-zinc-500 hover:text-red-500 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      responsibilities: [...formData.responsibilities, ''],
                    })
                  }
                  className="text-sm text-zinc-400 hover:text-zinc-200"
                >
                  + Add responsibility
                </button>
              </div>
            ) : (
              <ul className="space-y-2 text-zinc-400">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i}>▸ {r}</li>
                ))}
              </ul>
            )}
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-lg font-medium mb-3 text-zinc-300">
              Qualifications
            </h2>

            {isEditing ? (
              <div className="space-y-3">
                {formData.qualifications.map((qual, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      className="flex-1 bg-black border border-zinc-800 rounded-lg p-2 text-zinc-100 focus:outline-none focus:border-zinc-600"
                      value={qual}
                      onChange={(e) => {
                        const updated = [...formData.qualifications];
                        updated[index] = e.target.value;
                        setFormData({ ...formData, qualifications: updated });
                      }}
                    />

                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          qualifications: formData.qualifications.filter(
                            (_, i) => i !== index
                          ),
                        })
                      }
                      className="text-zinc-500 hover:text-red-500 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      qualifications: [...formData.qualifications, ''],
                    })
                  }
                  className="text-sm text-zinc-400 hover:text-zinc-200"
                >
                  + Add qualification
                </button>
              </div>
            ) : (
              <ul className="space-y-2 text-zinc-400">
                {selectedJob.qualifications.map((q, i) => (
                  <li key={i}>✓ {q}</li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
