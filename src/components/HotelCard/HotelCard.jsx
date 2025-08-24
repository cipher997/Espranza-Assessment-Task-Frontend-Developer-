import { useState } from "react";
import "./HotelCard.css";

export default function HotelCard({ hotel }) {
  const [expanded, setExpanded] = useState(false);

  // Extract lowest price from available rooms
  const getLowestPrice = () => {
    if (!hotel.roomResponses || hotel.roomResponses.length === 0) return null;
    return Math.min(...hotel.roomResponses.map(r => r.rateKeyResponses.totalPrice));
  };

  return (
    <div className="hotel-card">
      {/* ✅ Image on top */}
      <img
        src={hotel.hotelImageLinks?.[0]?.imageLink || "https://via.placeholder.com/200"}
        alt={hotel.hotelName}
        className="hotel-img"
      />

      {/* ✅ Info section */}
      <div className="hotel-info">
        <h2>{hotel.hotelName}</h2>
        <p>{hotel.rating}</p>
        <p>{hotel.address}</p>
      </div>

      {/* ✅ Footer (Price + Button) */}
      <div className="hotel-footer">
        {getLowestPrice() && (
          <span className="price">From ₹{getLowestPrice().toLocaleString()}</span>
        )}
        <button>View Details</button>
      </div>
    </div>
  );
}
