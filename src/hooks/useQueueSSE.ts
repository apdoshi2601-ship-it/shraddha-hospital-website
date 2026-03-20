"use client";

import { useState, useEffect, useRef } from "react";

export interface QueueData {
  id: string;
  doctor_name: string;
  doctor_slug: string;
  session: string;
  current_token: number;
  total_tokens: number;
  waiting_count: number;
  status: string;
  avg_wait_minutes: number;
  current_patient_name: string | null;
}

export function useQueueSSE() {
  const [queues, setQueues] = useState<QueueData[]>([]);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    function connect() {
      const es = new EventSource("/api/queue/sse");
      eventSourceRef.current = es;

      es.addEventListener("queue_update", (event) => {
        try {
          const data = JSON.parse(event.data);
          setQueues(data.queues);
          setLastUpdate(data.timestamp);
          setConnected(true);
        } catch {}
      });

      es.onopen = () => setConnected(true);

      es.onerror = () => {
        setConnected(false);
        es.close();
        // Reconnect after 3 seconds
        setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  return { queues, connected, lastUpdate };
}

// Fallback polling hook for browsers without SSE support
export function useQueuePolling(intervalMs = 10000) {
  const [queues, setQueues] = useState<QueueData[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    async function fetchQueues() {
      try {
        const res = await fetch("/api/queue");
        const data = await res.json();
        setQueues(data.queues || []);
        setLastUpdate(new Date().toISOString());
      } catch {}
    }

    fetchQueues();
    const interval = setInterval(fetchQueues, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { queues, connected: true, lastUpdate };
}
