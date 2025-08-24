import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { fetchDestinations } from "../../api/destinations";
import "./SearchForm.css";

export default function SearchForm() {
  const navigate = useNavigate();
  const { setSearchData } = useContext(SearchContext);

  const [destinationName, setDestinationName] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);

  // fetch suggestions
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestinationName(value);

    if (value.length > 2) {
      try {
        const data = await fetchDestinations(value);
        setSuggestions(data?.data || []);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
    }
  };

  // when user clicks a suggestion
  const handleSelectSuggestion = (place) => {
    setDestinationName(place.name || place.cityName || place.code);
    setDestinationId(place.id || place.code);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // build occupancy list: one object per room
    const occupancies = Array.from({ length: rooms }, () => ({
      rooms: 1,
      adults,
      children: 0,
      paxes: Array.from({ length: adults }, (_, i) => ({
        type: "AD",
        age: 30 + i,
      })),
    }));

    const formData = { destinationName, destinationId, checkIn, checkOut, occupancies };
    setSearchData(formData);

    navigate(
      `/results?destination=${encodeURIComponent(destinationName)}&checkIn=${checkIn}&checkOut=${checkOut}&destinationId=${destinationId}`
    );
  };


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Destination */}
      <div className="autocomplete-wrapper">
        <input
          type="text"
          placeholder="Destination"
          value={destinationName}
          onChange={handleDestinationChange}
          required
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((place, index) => (
              <li key={index} onClick={() => handleSelectSuggestion(place)}>
                {place.name || place.cityName || place.code}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dates */}
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        required
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        required
      />

      {/* Rooms & Adults */}
      <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))}>
        <option value={1}>1 Room</option>
        <option value={2}>2 Rooms</option>
        <option value={3}>3 Rooms</option>
      </select>

      <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
        <option value={1}>1 Adult</option>
        <option value={2}>2 Adults</option>
        <option value={3}>3 Adults</option>
        <option value={4}>4 Adults</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}
