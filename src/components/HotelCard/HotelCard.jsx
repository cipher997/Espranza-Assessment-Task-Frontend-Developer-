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
      {/* Basic hotel info */}
      <div className="hotel-header">
        <img
          src={hotel.hotelImageLinks?.[0]?.imageLink || "https://via.placeholder.com/200"}
          alt={hotel.hotelName}
          className="hotel-img"
        />
        <div className="hotel-info">
          <h2>{hotel.hotelName}</h2>
          <p>{hotel.rating}</p>
          <p>{hotel.address}</p>
          {getLowestPrice() && (
            <p className="price">From ₹{getLowestPrice().toLocaleString()}</p>
          )}
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {/* Expanded room options */}
      {expanded && (
        <div className="hotel-details">
          <h3>Available Rooms</h3>
          {hotel.roomResponses?.map((room, idx) => (
            <div key={idx} className="room-option">
              <img
                src={room.roomImageUrl?.[0] || "https://via.placeholder.com/150"}
                alt={room.roomName}
                className="room-img"
              />
              <div>
                <p><strong>{room.roomName}</strong></p>
                <p>Board: {room.boardNameResponse?.[0]?.boardName || "N/A"}</p>
                <p>Price: ₹{room.rateKeyResponses.totalPrice.toLocaleString()}</p>
                <button>Select</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
