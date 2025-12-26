import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

declare global {
  interface Window {
    MemberStack?: any;
  }
}

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const [status, setStatus] = useState<"loading" | "authed" | "nope">("loading");

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const ms = window.MemberStack;

        // If Memberstack hasn't loaded, treat as not logged in
        if (!ms) {
          if (!cancelled) setStatus("nope");
          return;
        }

        // Try the most common Memberstack session calls (different versions expose different methods)
        const tryFns = [
          ms.getCurrentMember,
          ms.getMemberJSON,
          ms.getMember,
          ms.member,
        ].filter(Boolean);

        for (const fn of tryFns) {
          try {
            const result = typeof fn === "function" ? await fn() : fn;
            // Memberstack often returns { data: { ...member } } or a member object directly
            const member = result?.data ?? result;
            if (member && (member.id || member.email)) {
              if (!cancelled) setStatus("authed");
              return;
            }
          } catch {
            // keep trying next method
          }
        }

        if (!cancelled) setStatus("nope");
      } catch {
        if (!cancelled) setStatus("nope");
      }
    }

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") return null;

  if (status === "nope") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
