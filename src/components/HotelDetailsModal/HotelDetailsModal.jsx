import "./HotelDetailsModal.css";

export default function HotelDetailsModal({ hotel, onClose }) {
  if (!hotel) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>{hotel.hotelName}</h2>
        <p>{hotel.address}</p>
        <p>{hotel.rating}</p>

        <div className="gallery">
          {hotel.hotelImageLinks?.slice(0, 5).map((img, idx) => (
            <img key={idx} src={img.imageLink} alt={img.imageType} />
          ))}
        </div>

        <p className="description">{hotel.description}</p>

        <h3>Available Rooms</h3>
        <ul className="room-list">
          {hotel.roomResponses?.map((room, idx) => (
            <li key={idx}>
              <strong>{room.roomName}</strong> ({room.boardNameResponse?.[0]?.boardName}) – 
              <span> INR {room.rateKeyResponses?.totalPrice}</span>
            </li>
          ))}
        </ul>

        <h3>Facilities</h3>
        <ul className="facilities">
          {hotel.facilityResponses?.map((f, idx) => (
            <li key={idx}>{f.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
