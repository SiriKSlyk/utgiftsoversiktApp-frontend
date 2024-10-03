import React, { useState } from 'react';

const AddNewExpense = ({ handleAddExpense }) => {
  // State for pop-up visibility
  const [showPopup, setShowPopup] = useState(false);
  const [newExpense, setNewExpense] = useState({
    date: '',
    category: '',
    sum: '',
    shop: '',
    description: '',
  });

  // Toggle pop-up visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpense(newExpense); // Call the function to add the new expense (to API)
    togglePopup(); // Close the pop-up after submission
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Button to trigger the pop-up */}
      <button onClick={togglePopup}>+ Legg til</button>

      {/* Pop-up form for adding new expense */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Legg til ny utgift</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Dato:
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Kategori:
                <input
                  type="text"
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Sum:
                <input
                  type="number"
                  name="sum"
                  value={newExpense.sum}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Butikk:
                <input
                  type="text"
                  name="shop"
                  value={newExpense.shop}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Beskrivelse:
                <input
                  type="text"
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Legg til</button>
              <button type="button" onClick={togglePopup}>Lukk</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewExpense;
