"use client";

import { useState } from "react";
import { Wifi, WifiOff, Clock, Search } from "lucide-react";
import { useQueueSSE } from "@/hooks/useQueueSSE";
import QueueCard from "./QueueCard";

export default function QueueDisplay() {
  const { queues, connected, lastUpdate } = useQueueSSE();
  const [myToken, setMyToken] = useState<number | undefined>(undefined);
  const [tokenInput, setTokenInput] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  function handleTokenLookup(e: React.FormEvent) {
    e.preventDefault();
    const num = parseInt(tokenInput);
    if (!isNaN(num) && num > 0) {
      setMyToken(num);
    }
  }

  const activeQueues = queues.filter((q) => q.status !== "completed");
  const completedQueues = queues.filter((q) => q.status === "completed");

  const filteredQueues = selectedDoctor
    ? activeQueues.filter((q) => q.doctor_slug === selectedDoctor)
    : activeQueues;

  return (
    <div className="space-y-6">
      {/* Connection status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {connected ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <Wifi size={14} />
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
              <WifiOff size={14} /> Reconnecting...
            </span>
          )}
        </div>
        {lastUpdate && (
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Clock size={12} />
            Updated {new Date(lastUpdate).toLocaleTimeString("en-IN")}
          </span>
        )}
      </div>

      {/* Token lookup */}
      <div className="bg-surface-alt rounded-xl p-4 border border-border/50">
        <form onSubmit={handleTokenLookup} className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs font-semibold text-text-muted mb-1 block">
              Track Your Token
            </label>
            <input
              type="number"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter your token #"
              className="form-input"
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <Search size={16} /> Track
          </button>
        </form>
        {myToken && (
          <p className="text-xs text-text-muted mt-2">
            Tracking token <strong className="text-primary">#{myToken}</strong> —
            {" "}your position is highlighted below
          </p>
        )}
      </div>

      {/* Doctor filter */}
      {activeQueues.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedDoctor("")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !selectedDoctor ? "bg-primary text-white" : "bg-surface-alt text-text-muted hover:text-primary"
            }`}
          >
            All Doctors
          </button>
          {activeQueues.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedDoctor(q.doctor_slug)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedDoctor === q.doctor_slug
                  ? "bg-primary text-white"
                  : "bg-surface-alt text-text-muted hover:text-primary"
              }`}
            >
              {q.doctor_name.replace("Dr. ", "")}
            </button>
          ))}
        </div>
      )}

      {/* Queue cards */}
      {filteredQueues.length === 0 ? (
        <div className="text-center py-16">
          <Clock size={48} className="mx-auto mb-4 text-text-muted/30" />
          <h3 className="text-lg font-display font-semibold text-text mb-2">
            No Active Queues Right Now
          </h3>
          <p className="text-sm text-text-muted max-w-sm mx-auto">
            OPD queues will appear here during consultation hours.
            <br />
            <strong>Morning:</strong> 10 AM - 1 PM &middot; <strong>Evening:</strong> 6 PM - 7 PM
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredQueues.map((q) => (
            <QueueCard key={q.id} queue={q} myToken={myToken} />
          ))}
        </div>
      )}

      {/* Completed queues */}
      {completedQueues.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
            Completed Sessions Today
          </p>
          <div className="flex flex-wrap gap-2">
            {completedQueues.map((q) => (
              <span key={q.id} className="text-xs bg-gray-50 text-text-muted px-3 py-1.5 rounded-full">
                {q.doctor_name} — {q.session} ({q.total_tokens} patients)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
