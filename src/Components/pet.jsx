import React, { useState, useEffect } from "react";

function Pet() {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    owner_name: "",
    owner_address: "",
    owner_phone: "",
    owner_email: "",
    animal_name: "",
    animal_species: "",
    animal_age: "",
    animal_image: "",
    vet_name: "",
    vet_specialty: "",
    vet_phone: "",
    vet_email: "",
    visit_date: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://petify-back.onrender.com/all_records") // Change URL here
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const resetBookingForm = () => {
    setNewBooking({
      owner_name: "",
      owner_address: "",
      owner_phone: "",
      owner_email: "",
      animal_name: "",
      animal_species: "",
      animal_age: "",
      animal_image: "",
      vet_name: "",
      vet_specialty: "",
      vet_phone: "",
      vet_email: "",
      visit_date: "",
      notes: "",
    });
  };

  const addBooking = () => {
    if (Object.values(newBooking).every((field) => field.trim())) {
      setLoading(true);
      fetch("https://petify-back.onrender.com/create_full_record", { // Change URL here
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      })
        .then((response) => response.json())
        .then((data) => {
          setBookings((prev) => [...prev, data]);
          resetBookingForm();
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to add booking. Please try again.");
          setLoading(false);
        });
    }
  };

  const updateBooking = () => {
    setLoading(true);
    const { visit_id } = newBooking;

    fetch(`https://petify-back.onrender.com/update_full_record/${visit_id}`, { // Change URL here
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings((prev) =>
          prev.map((booking) =>
            booking.visit_id === visit_id ? data : booking
          )
        );
        resetBookingForm();
        setIsEditing(false);
        setEditingBookingId(null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to update booking. Please try again.");
        setLoading(false);
      });
  };

  const deleteBooking = (visit_id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setLoading(true);
      fetch(`https://petify-back.onrender.com/delete_full_record/${visit_id}`, { // Change URL here
        method: "DELETE",
      })
        .then(() => {
          setBookings((prev) => prev.filter((b) => b.visit_id !== visit_id));
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to delete booking. Please try again.");
          setLoading(false);
        });
    }
  };

  const startEditing = (booking) => {
    setIsEditing(true);
    setEditingBookingId(booking.visit_id);
    setNewBooking({ ...booking });
  };

  const filteredBookings = bookings.filter((booking) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      booking.animal_name.toLowerCase().includes(searchTerm) ||
      booking.owner_name.toLowerCase().includes(searchTerm) ||
      booking.vet_name.toLowerCase().includes(searchTerm) ||
      booking.animal_species.toLowerCase().includes(searchTerm) ||
      (new Date(booking.visit_date).toLocaleDateString().includes(searchTerm)) // Added search for visit_date
    );
  });
  
  return (
    <div className="pet-list">
      <h1>Vet Booking List</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Search by animal, owner, vet, or visit date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <h2>{isEditing ? "Edit Booking" : "Add a New Booking"}</h2>
        {["owner_name", "owner_address", "owner_phone", "owner_email", "animal_name", "animal_species", "animal_age", "animal_image", "vet_name", "vet_specialty", "vet_phone", "vet_email", "visit_date", "notes"].map((field) => (
          field === "notes" ? (
            <textarea
              key={field}
              name={field}
              placeholder="Notes"
              value={newBooking[field]}
              onChange={handleInputChange}
            />
          ) : (
            <input
              key={field}
              type={field === "visit_date" ? "date" : field === "animal_age" ? "number" : field === "owner_email" || field === "vet_email" ? "email" : "text"}
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={newBooking[field]}
              onChange={handleInputChange}
            />
          )
        ))}
        <button onClick={isEditing ? updateBooking : addBooking} disabled={loading}>
          {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Booking"}
        </button>
      </div>

      <h2>Existing Bookings</h2>
      <ul>
        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          filteredBookings.map((booking) => (
            <li key={booking.visit_id}>
              <div className="booking-info">
                <h3>Owner Info</h3>
                <p>Name: {booking.owner_name}</p>
                <p>Address: {booking.owner_address}</p>
                <p>Phone: {booking.owner_phone}</p>
                <p>Email: {booking.owner_email}</p>

                <h3>Animal Info</h3>
                <p>Name: {booking.animal_name}</p>
                <p>Species: {booking.animal_species}</p>
                <p>Age: {booking.animal_age}</p>
                {booking.animal_image ? (
                  <img src={booking.animal_image} alt={booking.animal_name} />
                ) : (
                  <p>No image available</p>
                )}

                <h3>Vet Info</h3>
                <p>Name: {booking.vet_name}</p>
                <p>Specialty: {booking.vet_specialty}</p>
                <p>Phone: {booking.vet_phone}</p>
                <p>Email: {booking.vet_email}</p>

                <h3>Visit Date</h3>
                <p>{new Date(booking.visit_date).toLocaleDateString()}</p>

                <h3>Notes</h3>
                <p>{booking.notes || "No notes available"}</p>

                <button onClick={() => startEditing(booking)}>Edit</button>
                <button onClick={() => deleteBooking(booking.visit_id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Pet;


      



































