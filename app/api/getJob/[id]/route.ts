import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const jobId = params.id;
  const API_BASE = "https://d3ed3fpdxc3p43.cloudfront.net";
  const SECRET = "Sl5xxH8p7aehURuzxJzylQ8gDmHT5dWL";

  try {
    const response = await fetch(`${API_BASE}/api/job/${jobId}`, {
      method: "GET",
      headers: { "x-client-secret": SECRET },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}