import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

// NOTE: adjust this import to whatever you use to initialize Memberstack
// Common options:
//   import memberstack from "@memberstack/react";  (older patterns vary)
//   import MemberstackDOM from "@memberstack/dom";
// We will fix this precisely in the next step if your project uses a different one.

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

    async function check() {
      try {
        // Memberstack DOM v2 exposes window.MemberStack once the script loads
        const ms = window.MemberStack;

        // If Memberstack isn't loaded yet, treat as not authed
        if (!ms) {
          if (!cancelled) setStatus("nope");
          return;
        }

        // Many setups support: ms.getCurrentMember()
        const member = await ms.getCurrentMember?.();

        if (!cancelled) {
          setStatus(member ? "authed" : "nope");
        }
      } catch {
        if (!cancelled) setStatus("nope");
      }
    }

    check();
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
