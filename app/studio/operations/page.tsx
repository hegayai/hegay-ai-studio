"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/queue/jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    }
    loadJobs();
  }, []);

  return (
    <div className="flex gap-6 p-6">

      {/* JOB LIST */}
      <section className="w-64 shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Jobs
        </p>

        <div className="mt-3 space-y-2 max-h-[80vh] overflow-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="cursor-pointer rounded-md border border-slate-800 bg-slate-900 p-2 hover:border-cyan-400/60 transition"
            >
              <p className="text-[11px] text-slate-100">{job.id}</p>
              <p className="text-[10px] text-slate-500">{job.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOB DETAIL PANEL */}
      <section className="w-80 shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Job Detail
        </p>

        {!selectedJob && (
          <p className="mt-3 text-[11px] text-slate-500">
            Select a job from the list to inspect its metadata and context.
          </p>
        )}

        {selectedJob && (
          <div className="mt-3 space-y-4">

            {/* Job ID */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Job ID</p>
              <p className="text-[11px] text-slate-100 break-all">{selectedJob.id}</p>
            </div>

            {/* Workflow ID */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Workflow ID</p>
              <p className="text-[11px] text-slate-100 break-all">{selectedJob.workflowId}</p>
            </div>

            {/* Status + Timestamps */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
              <div>
                <p className="text-slate-500">Status</p>
                <p className="text-slate-100">{selectedJob.status}</p>
              </div>
              <div>
                <p className="text-slate-500">Created</p>
                <p>{new Date(selectedJob.createdAt).toLocaleString()}</p>
              </div>
              {selectedJob.startedAt && (
                <div>
                  <p className="text-slate-500">Started</p>
                  <p>{new Date(selectedJob.startedAt).toLocaleString()}</p>
                </div>
              )}
              {selectedJob.finishedAt && (
                <div>
                  <p className="text-slate-500">Finished</p>
                  <p>{new Date(selectedJob.finishedAt).toLocaleString()}</p>
                </div>
              )}
            </div>

            {/* Initial Context */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Initial Context</p>
              <pre className="max-h-40 overflow-auto rounded-md border border-slate-800 bg-slate-950/80 p-2 text-[10px] text-slate-200">
                {JSON.stringify(selectedJob.initialContext, null, 2)}
              </pre>
            </div>

            {/* Error */}
            {selectedJob.error && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.16em] text-rose-400">Error</p>
                <p className="text-[11px] text-rose-300">{selectedJob.error}</p>
              </div>
            )}

            {/* Final Context */}
            {selectedJob?.result?.finalContext && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Final Context</p>
                <pre className="max-h-40 overflow-auto rounded-md border border-slate-800 bg-slate-950/80 p-2 text-[10px] text-slate-200">
                  {JSON.stringify(selectedJob.result.finalContext, null, 2)}
                </pre>
              </div>
            )}

            {/* Logs */}
            {selectedJob?.result?.logs && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Logs</p>
                <pre className="max-h-40 overflow-auto rounded-md border border-slate-800 bg-slate-950/80 p-2 text-[10px] text-slate-200 whitespace-pre-wrap">
                  {selectedJob.result.logs.join("\n")}
                </pre>
              </div>
            )}

            {/* Trace */}
            {selectedJob?.result?.trace && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">Execution Trace</p>
                <pre className="max-h-40 overflow-auto rounded-md border border-slate-800 bg-slate-950/80 p-2 text-[10px] text-slate-200">
                  {JSON.stringify(selectedJob.result.trace, null, 2)}
                </pre>
              </div>
            )}

            {/* Images */}
            {selectedJob?.result?.images?.length > 0 && (
              <div className="space-y-2 mt-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Generated Images
                </p>

                <div className="flex flex-wrap gap-3">
                  {selectedJob.result.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative w-28 h-28 rounded-md overflow-hidden border border-slate-800 bg-slate-900 hover:border-cyan-400/60 transition"
                    >
                      <img
                        src={img.url}
                        alt={`Generated image ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {img.meta && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2">
                          <p className="text-[9px] text-slate-200 text-center leading-tight">
                            {img.meta.model || "Image"}<br />
                            {img.meta.width}×{img.meta.height}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </section>
    </div>
  );
}
