"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    return convexUrl ? new ConvexReactClient(convexUrl) : null;
  }, []);

  if (!convex) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md space-y-2 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Setup required
          </p>
          <p className="text-slate-600">
            Set <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_CONVEX_URL</code>{" "}
            in <code className="rounded bg-slate-100 px-1">.env.local</code> and
            run <code className="rounded bg-slate-100 px-1">npx convex dev</code>.
          </p>
        </div>
      </div>
    );
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
