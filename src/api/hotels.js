export async function fetchHotels({ checkIn, checkOut, destinationId, occupancies }) {
  const response = await fetch(
    `https://staging.travelyatra.com/api/unsecure/dummy/hotels?destinationId=${destinationId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-tenant-id": "pml",
      },
      body: JSON.stringify({
        traceId: `trace-${Date.now()}`,
        stay: { checkIn, checkOut },
        occupancies: occupancies || [], // 👈 dynamic from form
      }),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Hotels API error response:", data);
    throw new Error("Failed to fetch hotels");
  }

  console.log("Hotels API response:", data);
  return data;
}
