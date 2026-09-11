"use client";

import { useCallback, useState } from "react";

const WEBHOOK_URL = "/api/contact";

export type SendStatus = "idle" | "loading" | "success" | "error";

type SendResult = unknown;

/**
 * useSendContact
 * Hook to POST a FormData payload to the provided webhook URL.
 * - Do not set Content-Type when sending FormData; the browser will handle boundaries.
 */
export function useSendContact() {
  const [status, setStatus] = useState<SendStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (formData: FormData): Promise<SendResult> => {
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Request failed: ${res.status} ${res.statusText}${
            text ? ` - ${text}` : ""
          }`
        );
      }

      // Try to parse JSON, fall back to text
      try {
        const data = await res.json();
        setStatus("success");
        return data as SendResult;
      } catch (_) {
        const text = await res.text();
        setStatus("success");
        return text as SendResult;
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setError(msg);
      setStatus("error");
      throw e;
    }
  }, []);

  return {
    send,
    status,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}

/**
 * Utility function for one-off sends without hook state.
 */
export async function sendContact(formData: FormData): Promise<SendResult> {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Request failed: ${res.status} ${res.statusText}${
        text ? ` - ${text}` : ""
      }`
    );
  }
  try {
    return (await res.json()) as SendResult;
  } catch (_) {
    return (await res.text()) as SendResult;
  }
}
