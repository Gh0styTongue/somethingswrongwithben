"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function SharePage() {
  const router = useRouter();
  const params = useParams();
  const name = params?.name as string;

  useEffect(() => {
    if (name) {
      router.push(`/?name=${encodeURIComponent(name)}&auto=true`);
    } else {
      router.push("/");
    }
  }, [name, router]);

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p className="status-text active">LOADING SHARED MESSAGE...</p>
    </div>
  );
}