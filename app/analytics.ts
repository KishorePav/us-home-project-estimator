export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const analyticsId = "G-HRSE4676EK";

type TrackEventOptions = {
  onSent?: () => void;
  timeoutMs?: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params: AnalyticsParams = {},
  options: TrackEventOptions = {},
) {
  const finish = options.onSent;

  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    finish?.();
    return;
  }

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  let completed = false;
  let timeoutId: number | undefined;
  const done = () => {
    if (completed) return;
    completed = true;
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    finish?.();
  };

  if (finish) {
    timeoutId = window.setTimeout(done, options.timeoutMs ?? 1500);
  }

  window.gtag("event", name, {
    ...cleaned,
    send_to: analyticsId,
    transport_type: "beacon",
    ...(finish ? { event_callback: done } : {}),
  });
}