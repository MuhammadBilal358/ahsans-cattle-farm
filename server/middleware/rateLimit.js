// Tiny in-memory rate limiter (no extra npm package needed).
// Limits how many requests one IP can make to a route within a time window.
// Good enough for a single small server; resets whenever the server restarts.
function rateLimit({ windowMs, max, message }) {
  const hits = new Map(); // ip -> { count, resetAt }

  return function (req, res, next) {
    const now = Date.now();
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    let entry = hits.get(ip);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(ip, entry);
    }
    entry.count += 1;

    // Occasionally clean up old entries so the map doesn't grow forever
    if (hits.size > 5000) {
      for (const [key, val] of hits) if (val.resetAt <= now) hits.delete(key);
    }

    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ message });
    }
    next();
  };
}

module.exports = { rateLimit };
