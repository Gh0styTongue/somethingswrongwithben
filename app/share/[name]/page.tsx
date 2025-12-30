"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SharePage() {
  const router = useRouter();
  const params = useParams();
  const name = params?.name as string;

  useEffect(() => {
    if (name) {
      // Redirect to home with the name in a query parameter
      router.push(`/?name=${encodeURIComponent(name)}&auto=true`);
    } else {
      router.push("/");
    }
  }, [name, router]);

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
      <p className="status-text active">LOADING SHARED MESSAGE...</p>
    </div>
  );
}