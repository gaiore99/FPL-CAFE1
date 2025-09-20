// Common helpers
export async function robustJsonFetch(url, { headers = {}, retry = 2 } = {}) {
  const common = {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) FPLCafe/3.0",
      "Accept": "application/json, text/plain, */*",
      ...headers,
    },
    redirect: "follow",
    cache: "no-store",
  };
  let lastErr = null;
  for (let attempt = 0; attempt <= retry; attempt++) {
    try {
      const res = await fetch(url, common);
      const text = await res.text();
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`Upstream ${res.status}: ${text.slice(0,200)}`);
      }
      try { return JSON.parse(text); }
      catch(e){ throw new Error(`Invalid JSON: ${String(e)} :: ${text.slice(0,200)}`); }
    } catch (e) {
      lastErr = e;
      if (attempt < retry) await new Promise(r => setTimeout(r, 250 * (attempt+1)));
    }
  }
  throw lastErr || new Error("Unknown upstream error");
}
export function okJson(res, data, cache="s-maxage=30, stale-while-revalidate=60") {
  res.setHeader("Cache-Control", cache);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(200).send(JSON.stringify(data));
}
export function errJson(res, code, msg) {
  res.status(code).json({ error: "Upstream error", detail: String(msg) });
}
