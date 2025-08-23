import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext, useMemo } from "react";
import { SearchContext } from "../../context/SearchContext";
import { fetchHotels } from "../../api/hotels";
import HotelCard from "../../components/HotelCard/HotelCard";
import "./ResultsPage.css";

export default function ResultsPage() {
  const location = useLocation();
  const { searchData } = useContext(SearchContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filter & sort state
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000); // can tweak default
  const [sortBy, setSortBy] = useState("price-asc");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const destinationId = queryParams.get("destinationId");

    async function loadHotels() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHotels({
          checkIn,
          checkOut,
          destinationId: Number(destinationId),
          occupancies: searchData?.occupancies, // 👈 use context
        });
        setHotels(data?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (checkIn && checkOut && destinationId) {
      loadHotels();
    }
  }, [location.search, searchData]);

  // ✅ derived filtered + sorted hotels
  const filteredHotels = useMemo(() => {
    let list = [...hotels];

    // filter by rating
    list = list.filter((h) => {
      const ratingNum = parseInt(h.rating); // "4 STARS" → 4
      return !isNaN(ratingNum) ? ratingNum >= minRating : true;
    });

    // filter by max price (using first room as reference)
    list = list.filter((h) => {
      const price = h.roomResponses?.[0]?.rateKeyResponses?.totalPrice || 0;
      return price <= maxPrice;
    });

    // sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => {
        const pa = a.roomResponses?.[0]?.rateKeyResponses?.totalPrice || 0;
        const pb = b.roomResponses?.[0]?.rateKeyResponses?.totalPrice || 0;
        return pa - pb;
      });
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => {
        const pa = a.roomResponses?.[0]?.rateKeyResponses?.totalPrice || 0;
        const pb = b.roomResponses?.[0]?.rateKeyResponses?.totalPrice || 0;
        return pb - pa;
      });
    } else if (sortBy === "rating") {
      list.sort((a, b) => {
        const ra = parseInt(a.rating) || 0;
        const rb = parseInt(b.rating) || 0;
        return rb - ra;
      });
    } else if (sortBy === "name") {
      list.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
    }

    return list;
  }, [hotels, minRating, maxPrice, sortBy]);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="results-page">
      <h1>Search Results</h1>

      {/* ✅ FILTERS + SORT CONTROLS */}
      <div className="filters">
        <label>
          Min Rating:
          <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
            <option value={0}>Any</option>
            <option value={3}>3★+</option>
            <option value={4}>4★+</option>
            <option value={5}>5★</option>
          </select>
        </label>

        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>

        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating: High → Low</option>
            <option value="name">Name (A → Z)</option>
          </select>
        </label>
      </div>

      {/* ✅ HOTEL LIST */}
      {filteredHotels.length === 0 ? (
        <p>No hotels match your filters.</p>
      ) : (
        filteredHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
      )}
    </div>
  );
}
