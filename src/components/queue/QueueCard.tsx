"use client";

import { Users, Clock, Pause, CheckCircle, CircleDot } from "lucide-react";
import type { QueueData } from "@/hooks/useQueueSSE";

interface Props {
  queue: QueueData;
  myToken?: number;
}

function getStatusConfig(status: string) {
  switch (status) {
    case "active":
      return { label: "Active", color: "bg-emerald-500", textColor: "text-emerald-600", icon: CircleDot };
    case "paused":
      return { label: "Paused", color: "bg-amber-500", textColor: "text-amber-600", icon: Pause };
    case "completed":
      return { label: "Completed", color: "bg-gray-400", textColor: "text-gray-500", icon: CheckCircle };
    default:
      return { label: "Not Started", color: "bg-gray-300", textColor: "text-gray-400", icon: Clock };
  }
}

export default function QueueCard({ queue, myToken }: Props) {
  const statusConfig = getStatusConfig(queue.status);
  const StatusIcon = statusConfig.icon;
  const isMyTurn = myToken !== undefined && myToken === queue.current_token;
  const myPosition = myToken !== undefined && myToken > queue.current_token
    ? myToken - queue.current_token
    : 0;
  const estWaitMinutes = myPosition * queue.avg_wait_minutes;

  return (
    <div className={`bg-white rounded-2xl border-2 p-6 transition-all ${
      isMyTurn ? "border-emerald-400 shadow-lg ring-2 ring-emerald-100" : "border-border/50 shadow-card"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-display font-bold text-lg text-text">{queue.doctor_name}</h3>
          <p className="text-xs text-text-muted capitalize">
            {queue.session} Session
          </p>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${statusConfig.color}`}>
          <StatusIcon size={12} />
          {statusConfig.label}
        </div>
      </div>

      {/* Current Token — big display */}
      <div className="text-center mb-5">
        <p className="text-xs text-text-muted uppercase tracking-wider font-medium mb-1">Now Serving</p>
        <div className="text-6xl font-bold font-display text-primary leading-none">
          {queue.status === "not_started" ? "—" : `#${queue.current_token}`}
        </div>
        {queue.current_patient_name && queue.status === "active" && (
          <p className="text-sm text-text-muted mt-2">{queue.current_patient_name}</p>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-surface-alt rounded-xl p-3 text-center">
          <Users size={16} className="mx-auto mb-1 text-text-muted" />
          <div className="text-lg font-bold font-display text-text">{queue.waiting_count}</div>
          <div className="text-[11px] text-text-muted">Waiting</div>
        </div>
        <div className="bg-surface-alt rounded-xl p-3 text-center">
          <Clock size={16} className="mx-auto mb-1 text-text-muted" />
          <div className="text-lg font-bold font-display text-text">
            ~{queue.waiting_count * queue.avg_wait_minutes} min
          </div>
          <div className="text-[11px] text-text-muted">Est. Total Wait</div>
        </div>
      </div>

      {/* My token indicator */}
      {myToken !== undefined && myToken > 0 && (
        <div className={`rounded-xl p-4 text-center ${
          isMyTurn
            ? "bg-emerald-50 border border-emerald-200"
            : "bg-primary-light border border-primary/10"
        }`}>
          {isMyTurn ? (
            <>
              <p className="text-lg font-bold text-emerald-700">It&apos;s Your Turn!</p>
              <p className="text-sm text-emerald-600">Please proceed to the consultation room</p>
            </>
          ) : myPosition > 0 ? (
            <>
              <p className="text-sm text-text-muted">Your Token: <strong className="text-primary text-lg">#{myToken}</strong></p>
              <p className="text-sm text-text-muted mt-1">
                <strong className="text-text">{myPosition} patients</strong> ahead of you
                {" "}&middot;{" "}
                <strong className="text-text">~{estWaitMinutes} min</strong> wait
              </p>
            </>
          ) : (
            <p className="text-sm text-text-muted">
              Your consultation (Token #{myToken}) is complete
            </p>
          )}
        </div>
      )}
    </div>
  );
}
