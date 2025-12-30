export type PosthogProxyOptions = {
  // Upstream PostHog host, including protocol (e.g. https://app.posthog.com)
  upstream: string;

  // Optional extra headers to add to the proxied request.
  extraHeaders?: Record<string, string>;
};

// Proxy a Next.js Route Handler request to PostHog to keep ingestion first-party.
export async function proxyPosthogRequest(req: Request, opts: PosthogProxyOptions): Promise<Response> {
  const url = new URL(req.url);
  const upstream = new URL(opts.upstream);

  const pathAfterApi = url.pathname.replace(/^\/api\/posthog/, "");
  const upstreamUrl = new URL(pathAfterApi + url.search, upstream);

  const headers = new Headers(req.headers);
  headers.set("host", upstream.host);
  headers.set("accept-encoding", "identity");

  if (opts.extraHeaders) {
    for (const [k, v] of Object.entries(opts.extraHeaders)) headers.set(k, v);
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method.toUpperCase()) ? undefined : await req.arrayBuffer(),
    redirect: "manual"
  };

  const upstreamRes = await fetch(upstreamUrl, init);

  const resHeaders = new Headers(upstreamRes.headers);
  // Ensure cookies are first-party (avoid third-party cookie context). Strip upstream domain attributes.
  const setCookie = resHeaders.get("set-cookie");
  if (setCookie) {
    resHeaders.set("set-cookie", setCookie.replace(/;\s*Domain=[^;]+/gi, ""));
  }

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    statusText: upstreamRes.statusText,
    headers: resHeaders
  });
}
