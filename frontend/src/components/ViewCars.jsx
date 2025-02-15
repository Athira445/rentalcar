import React, { useEffect, useState } from "react";
import "./ViewCars.css";

function ViewCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    carName: "",
    model: "",
    price: "",
    imgFile: null, // Handle file upload
  });

  const ownerUserId = localStorage.getItem("userId"); // Get logged-in owner's ID

  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch only the logged-in owner's cars
  const fetchCars = async () => {
    if (!ownerUserId) {
      alert("User not logged in. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/cars?ownerUserId=${ownerUserId}`);
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setCars(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  // Handle input change (text fields)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") {
      setFormData({ ...formData, imgFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Delete car function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/cars/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Car deleted successfully!");
          fetchCars(); // Refresh the list
        } else {
          alert("Error deleting car!");
        }
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    }
  };

  // Open edit form and prefill details
  const handleEdit = (car) => {
    setEditingCar(car._id);
    setFormData({
      brand: car.brand,
      carName: car.carName,
      model: car.model,
      price: car.price,
      imgFile: null, // Reset file input
    });
  };

  // Update car details
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("carName", formData.carName);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("price", formData.price);
    if (formData.imgFile) {
      formDataToSend.append("imgFile", formData.imgFile);
    }

    try {
      const response = await fetch(`http://localhost:4000/api/cars/${editingCar}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Car updated successfully!");
        setEditingCar(null);
        fetchCars(); // Refresh the list
      } else {
        alert("Error updating car!");
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="view-cars">
      <h1>My Cars</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cars.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Brand</th>
                <th>Car Name</th>
                <th>Model</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={`http://localhost:4000/public/images/${car.imgFile}`}
                      alt={car.carName}
                      width="100"
                    />
                  </td>
                  <td>{car.brand}</td>
                  <td>{car.carName}</td>
                  <td>{car.model}</td>
                  <td>${car.price}</td>
                  <td>
                    <button onClick={() => handleEdit(car)}>Update</button>
                    <button onClick={() => handleDelete(car._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Car Form */}
          {editingCar && (
            <div className="edit-form">
              <h2>Edit Car Details</h2>
              <form onSubmit={handleUpdate}>
                <div>
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Car Name</label>
                  <input
                    type="text"
                    name="carName"
                    value={formData.carName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Upload New Image (Optional)</label>
                  <input type="file" name="imgFile" onChange={handleChange} />
                </div>
                <button type="submit">Update Car</button>
                <button type="button" onClick={() => setEditingCar(null)}>Cancel</button>
              </form>
            </div>
          )}
        </>
      ) : (
        <p>No cars available.</p>
      )}
    </div>
  );
}

export default ViewCars;
