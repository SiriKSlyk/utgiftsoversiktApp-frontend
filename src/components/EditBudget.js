import React, { useState, useEffect } from 'react';

const BudgetEdit = ({ budget, handleSubmit }) => {
    const [isEditing, setIsEditing] = useState(false); // Styrer visningen av redigeringsfeltene
    const [updatedBudget, setUpdatedBudget] = useState({
        House: budget.house,
        Food: budget.food,
        Transport: budget.transport,
        Saving: budget.saving,
        Debt: budget.debt,
        Sum: budget.sum,
        Etc: budget.etc,
        UserId: budget.userId,
        Id: budget.id
});

useEffect(() => {
    setUpdatedBudget({
        House: budget.house || 0,
        Food: budget.food || 0,
        Transport: budget.transport || 0,
        Saving: budget.saving || 0,
        Debt: budget.debt || 0,
        Sum: budget.sum || 0,
        Etc: budget.etc || 0
    });
}, [budget]); // Denne vil kjøre på hver oppdatering av `budget`

    // Når redigeringsknappen trykkes, vis redigeringsfeltene
    const handleEditClick = () => {
        setIsEditing(true);
        
    };

    // Oppdater inputfeltene når brukeren endrer dem
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBudget((prevBudget) => ({
            ...prevBudget,
            [name]: value
        }));
    };

    // Funksjonen som håndterer innsending
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit("budget/update", "PUT", JSON.stringify(updatedBudget)); // Kaller handleSubmit fra forelderkomponenten med oppdaterte data
        setIsEditing(false); // Skjuler feltene etter innsending
    };

    // Avbryt redigeringen uten å lagre
    const handleCancel = () => {
        setIsEditing(false); // Skjuler redigeringsfeltene
    };

    return (
        <div>
            {!isEditing ? (
                <button style={{margin:"10px"}} onClick={handleEditClick}>Rediger Budsjett</button> // Viser redigeringsknappen
            ) : (
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Hus:</label>
                        <input
                            type="text"
                            name="House"
                            value={parseFloat(updatedBudget.House)}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mat:</label>
                        <input
                            type="text"
                            name="Food"
                            value={updatedBudget.Food}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Transport:</label>
                        <input
                            type="text"
                            name="Transport"
                            value={updatedBudget.Transport}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Sparing:</label>
                        <input
                            type="text"
                            name="Saving"
                            value={updatedBudget.Saving}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Lån:</label>
                        <input
                            type="text"
                            name="Debt"
                            value={updatedBudget.Debt}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Sum:</label>
                        <input
                            type="text"
                            name="Sum"
                            value={updatedBudget.Sum}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Annet:</label>
                        <input
                            type="text"
                            name="Etc"
                            value={updatedBudget.Etc}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Lagre</button> {/* Sender data til handleSubmit */}
                        <button type="button" onClick={handleCancel}>Avbryt</button> {/* Avbryter redigeringen */}
                    </div>
                </form>
            )}
        </div>
    );
};

export default BudgetEdit;
