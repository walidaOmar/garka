// Minimal enqueueNotification helper for local/dev usage.
// In production you may want this to call an API or websocket.
export function enqueueNotification(target, type, payload = {}) {
  // For now log to console and emit a browser notification (if available)
  console.info('[enqueueNotification]', { target, type, payload });

  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      if (Notification.permission === 'granted') {
        new Notification(`Notification: ${type}`, {
          body: `To: ${target} — ${JSON.stringify(payload)}`,
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    } catch (e) {
      // ignore notification errors
    }
  }
}
