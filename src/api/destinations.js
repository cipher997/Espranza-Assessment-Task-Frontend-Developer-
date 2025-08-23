export async function fetchDestinations(query) {
  const response = await fetch("https://staging.travelyatra.com/api/unsecure/dummy/hotels/places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": "pml",
    },
    body: JSON.stringify({
      paginationFilterRequest: {
        paginationAction: "INITIAL_PAGE",
        maxLimit: 10,
        sortingOrder: "ASC",
      },
      search: query,
      fetchStaticDestination: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch destinations");
  }
  const data = await response.json();
  console.log("Destination API response:", data); // 👈 add this
  return data;
}
