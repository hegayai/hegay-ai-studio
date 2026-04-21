"use client";

import { useState } from "react";

export default function Page() {
  const [workflowName, setWorkflowName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runWorkflow() {
    try {
      setLoading(true);
      const res = await fetch("/api/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflow: workflowName }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-slate-100">Workflow Builder</h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter workflow name"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="w-64 rounded-md border border-slate-700 bg-slate-900 p-2 text-slate-200"
        />

        <button
          onClick={runWorkflow}
          disabled={loading}
          className="rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500 disabled:opacity-50"
        >
          {loading ? "Running..." : "Run Workflow"}
        </button>
      </div>

      {result && (
        <pre className="rounded-md border border-slate-700 bg-slate-900 p-4 text-slate-200 max-w-xl overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
