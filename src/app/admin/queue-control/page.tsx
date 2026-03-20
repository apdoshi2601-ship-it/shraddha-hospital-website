"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Play, Pause, SkipForward, UserPlus, RefreshCw, Users, Star,
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  slug: string;
  role: string;
}

interface Queue {
  id: string;
  session: string;
  current_token: number;
  total_tokens: number;
  status: string;
  doctor_name: string;
  doctor_slug: string;
  waiting_count: number;
}

interface Token {
  id: string;
  token_number: number;
  patient_name: string;
  patient_phone: string;
  is_priority: boolean;
  status: string;
}

export default function QueueControlPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [selectedQueue, setSelectedQueue] = useState<string>("");
  const [tokens, setTokens] = useState<Token[]>([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientPhone, setNewPatientPhone] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Load doctors
  useEffect(() => {
    fetch("/api/doctors")
      .then((r) => r.json())
      .then((d) => setDoctors(d.doctors || []));
  }, []);

  // Load queues
  const loadQueues = useCallback(async () => {
    const res = await fetch("/api/queue");
    const data = await res.json();
    setQueues(data.queues || []);
  }, []);

  useEffect(() => {
    loadQueues();
    const interval = setInterval(loadQueues, 5000);
    return () => clearInterval(interval);
  }, [loadQueues]);

  // Load tokens for selected queue
  const loadTokens = useCallback(async () => {
    if (!selectedQueue) return;
    const res = await fetch(`/api/queue/${selectedQueue}`);
    const data = await res.json();
    setTokens(data.tokens || []);
  }, [selectedQueue]);

  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  async function createQueue(doctorId: string, session: string) {
    const res = await fetch("/api/queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctor_id: doctorId, session }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Queue created`);
      loadQueues();
    } else {
      setMessage(data.error || "Failed");
    }
    setTimeout(() => setMessage(""), 3000);
  }

  async function updateQueueStatus(queueId: string, status: string) {
    await fetch(`/api/queue/${queueId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadQueues();
    loadTokens();
  }

  async function advanceQueue(queueId: string) {
    setLoading(true);
    const res = await fetch(`/api/queue/${queueId}/advance`, { method: "POST" });
    const data = await res.json();
    setMessage(
      data.current_token
        ? `Now serving token #${data.current_token}`
        : data.message || "Advanced"
    );
    loadQueues();
    loadTokens();
    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  }

  async function addToken(queueId: string) {
    if (!newPatientName) return;
    await fetch(`/api/queue/${queueId}/tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patient_name: newPatientName,
        patient_phone: newPatientPhone,
        is_priority: isPriority,
        priority_fee_paid: isPriority ? 200 : 0,
      }),
    });
    setNewPatientName("");
    setNewPatientPhone("");
    setIsPriority(false);
    loadQueues();
    loadTokens();
  }

  // Filter resident doctors for queue creation
  const residentDocs = doctors.filter((d) => d.role !== "visiting");

  return (
    <div className="min-h-screen bg-surface-alt">
      <div className="bg-surface-dark text-white p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={20} />
            <h1 className="text-lg font-bold">Queue Control — Receptionist Panel</h1>
          </div>
          <a href="/" className="text-white/60 text-sm hover:text-white">Back to Site</a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {message && (
          <div className="bg-primary-light text-primary text-sm p-3 rounded-lg mb-4 font-medium">
            {message}
          </div>
        )}

        {/* Create queues section */}
        <div className="bg-white rounded-xl p-6 border border-border/50 mb-6">
          <h2 className="font-display font-semibold text-lg mb-4">Start Today&apos;s Queues</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {residentDocs.map((doc) => (
              <div key={doc.id} className="border border-border/50 rounded-lg p-3">
                <div className="text-sm font-semibold mb-2">{doc.name}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => createQueue(doc.id, "morning")}
                    className="btn btn-sm btn-outline flex-1 text-xs"
                  >
                    Morning
                  </button>
                  <button
                    onClick={() => createQueue(doc.id, "evening")}
                    className="btn btn-sm btn-outline flex-1 text-xs"
                  >
                    Evening
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active queues */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Queue list */}
          <div className="bg-white rounded-xl p-6 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">Active Queues</h2>
              <button onClick={loadQueues} className="text-text-muted hover:text-primary">
                <RefreshCw size={16} />
              </button>
            </div>

            {queues.length === 0 ? (
              <p className="text-sm text-text-muted py-8 text-center">No queues for today. Create one above.</p>
            ) : (
              <div className="space-y-3">
                {queues.map((q) => (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedQueue === q.id
                        ? "border-primary bg-primary-light/30"
                        : "border-border/50 hover:border-primary/20"
                    }`}
                    onClick={() => setSelectedQueue(q.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold text-sm">{q.doctor_name}</span>
                        <span className="text-xs text-text-muted ml-2 capitalize">{q.session}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        q.status === "active" ? "bg-emerald-100 text-emerald-700"
                        : q.status === "paused" ? "bg-amber-100 text-amber-700"
                        : q.status === "completed" ? "bg-gray-100 text-gray-500"
                        : "bg-gray-100 text-gray-500"
                      }`}>
                        {q.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-text-muted">
                      <span>Token: #{q.current_token}</span>
                      <span>Waiting: {q.waiting_count}</span>
                      <span>Total: {q.total_tokens}</span>
                    </div>

                    {/* Controls */}
                    {selectedQueue === q.id && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                        {q.status === "not_started" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQueueStatus(q.id, "active"); }}
                            className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600 flex-1"
                          >
                            <Play size={14} /> Start
                          </button>
                        )}
                        {q.status === "active" && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); advanceQueue(q.id); }}
                              disabled={loading}
                              className="btn btn-sm btn-primary flex-1"
                            >
                              <SkipForward size={14} /> Next Patient
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateQueueStatus(q.id, "paused"); }}
                              className="btn btn-sm bg-amber-100 text-amber-700 hover:bg-amber-200"
                            >
                              <Pause size={14} />
                            </button>
                          </>
                        )}
                        {q.status === "paused" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); updateQueueStatus(q.id, "active"); }}
                            className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600 flex-1"
                          >
                            <Play size={14} /> Resume
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Token management */}
          <div className="space-y-6">
            {/* Add patient */}
            {selectedQueue && (
              <div className="bg-white rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-4">
                  <UserPlus size={18} className="inline mr-2" />
                  Add Walk-In Patient
                </h2>
                <div className="space-y-3">
                  <input
                    className="form-input"
                    placeholder="Patient Name *"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                  />
                  <input
                    className="form-input"
                    placeholder="Phone (optional)"
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                  />
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPriority}
                      onChange={(e) => setIsPriority(e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-border"
                    />
                    <Star size={14} className="text-amber-500" />
                    Priority (Paid Slot — ₹200)
                  </label>
                  <button
                    onClick={() => addToken(selectedQueue)}
                    disabled={!newPatientName}
                    className="btn btn-primary btn-full"
                  >
                    <UserPlus size={16} /> Add to Queue
                  </button>
                </div>
              </div>
            )}

            {/* Token list */}
            {selectedQueue && tokens.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-border/50">
                <h2 className="font-display font-semibold text-lg mb-4">Patient List</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {tokens.map((t) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between p-3 rounded-lg text-sm ${
                        t.status === "in_consultation"
                          ? "bg-emerald-50 border border-emerald-200"
                          : t.status === "completed"
                          ? "bg-gray-50 text-text-muted"
                          : t.is_priority
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-surface-alt"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold font-display text-lg w-8">#{t.token_number}</span>
                        <div>
                          <div className="font-medium">{t.patient_name}</div>
                          {t.is_priority && (
                            <span className="text-[10px] text-amber-600 font-semibold">PRIORITY</span>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        t.status === "in_consultation" ? "bg-emerald-100 text-emerald-700"
                        : t.status === "completed" ? "bg-gray-200 text-gray-500"
                        : "bg-blue-50 text-blue-600"
                      }`}>
                        {t.status === "in_consultation" ? "In Consultation"
                        : t.status === "completed" ? "Done"
                        : "Waiting"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
