import { useEffect, useState } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { supabase } from "@/lib/supabase";

type RequireAuthProps = {
  children: JSX.Element;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();

  const [status, setStatus] = useState<"loading" | "authed" | "nope">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (cancelled) return;

        setStatus(session?.user ? "authed" : "nope");
      } catch {
        if (!cancelled) {
          setStatus("nope");
        }
      }
    }

    checkAuth();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session?.user ? "authed" : "nope");
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  if (status === "loading") {
    return null;
  }

  if (status === "nope") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
