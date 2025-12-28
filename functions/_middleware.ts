// Manually define Cloudflare Pages types to avoid TS errors since @cloudflare/workers-types might be missing
interface EventContext<Env, P extends string, Data> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
}

type PagesFunction<Env = unknown, Params extends string = string, Data = unknown> = (
  context: EventContext<Env, Params, Data>
) => Response | Promise<Response>;

// types for Cloudflare Pages Functions
interface Env {
  ASSETS: any; // Fetcher for static assets
  // DB binding or other env vars would go here
}

/**
 * Traffic Cop Middleware
 * Intercepts /api/* requests and routes them to /app_<internal_id>/*
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // 1. Only intervene if the path starts with /api/
  if (path.startsWith('/api/')) {
    const hostname = url.hostname;
    
    // 2. Resolve Hostname -> Internal App ID
    // In a real production app, you might use a KV store here for speed:
    // const appId = await context.env.APP_MAPPING_KV.get(hostname);
    
    // For this scaffold, we Mock the mapping function
    const getInternalIdFromDomain = (domain: string): string => {
      // Mock logic
      if (domain.includes('dogwalker')) return 'app_dogwalker';
      if (domain.includes('finance')) return 'app_finance';
      // Fallback or Default
      return 'app_template'; 
    };

    const internalId = getInternalIdFromDomain(hostname);

    // 3. Rewrite the URL
    // From: https://dogwalker.com/api/calculate
    // To:   https://dogwalker.com/functions/app_dogwalker/calculate (Internal Routing)
    // Note: In Cloudflare Pages, mounted functions live at the root conceptually for routing purposes
    // usually mapped to /api if you structured it that way, but here we are routing *to* a specific folder.
    
    // We strip '/api' and prepend the internal app folder name
    const newPath = path.replace('/api', `/${internalId}`);
    
    const newUrl = new URL(context.request.url);
    newUrl.pathname = newPath;

    // 4. Create a new request with the rewritten URL
    const newRequest = new Request(newUrl.toString(), context.request);

    // 5. Pass to the next handler (or re-fetch if internal dispatching is needed)
    // context.next(newRequest) passes the modified request down the middleware chain.
    // If there is a function at /functions/app_dogwalker/hello.js, 
    // it will now match because we changed the pathname to /app_dogwalker/hello
    return context.next(newRequest);
  }

  // Pass through all non-API requests (statics, frontend routing)
  return context.next();
};