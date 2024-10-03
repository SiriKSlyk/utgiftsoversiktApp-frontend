import { useState } from 'react';

const ExpenseTable = ({ expenses, updateExpense, handleDelete, last}) => {
    const [editExpenseId, setEditExpenseId] = useState(null); // Track which expense is being edited
    const [newExpense, setNewExpense] = useState({
        date: '',
        shop: '',
        category: '',
        sum: '',
        description: ''
    });

    const [showInputRow, setShowInputRow] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value
        }));
    };

    const handleSubmitNewExpense = (e) => {
        e.preventDefault();
        const payload = {
            Id: "String",
            UserId: "",
            Date: newExpense.date,
            Month: "092024",
            Shop: newExpense.shop,
            Category: newExpense.category,
            Sum: parseFloat(newExpense.sum),
            Description: newExpense.description
        }
        last('expense/create', 'POST', JSON.stringify(payload)); // Sender data til API for å legge til utgift
        setNewExpense({ date: '', category: '', sum: '', shop: '', description: '' }); // Tilbakestille input
        setShowInputRow(false); // Skjuler input raden etter innsending
    };


    



    // Edit button clicked - set edit mode
    const handleEditClick = (expense) => {
        setEditExpenseId(expense.id); // Set the expense to edit mode
        setNewExpense({ ...expense }); // Fill input fields with existing values
    };

    // Submit edited expense
    const handleEditSubmit = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7062/update/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include',
                body: JSON.stringify(newExpense)
            });

            if (!response.ok) {
                throw new Error('Failed to update expense');
            }

            const result = await response.json();
            console.log('Expense updated with ID:', result);

            updateExpense(result); // Update the expense in the parent component
            setEditExpenseId(null); // Exit edit mode after successful update
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditExpenseId(null); // Exit edit mode without saving
    };

   
    return (
        <div>
            <div className="controls">
                <label>Vis:</label>
                <select>
                    <option>Alle</option>
                </select>

                <label>Filtrer etter:</label>
                <select>
                    <option>Alle</option>
                    {/*<option>Bolig</option>
                    <option>Mat</option>
                    <option>Transport</option>
                    <option>Gjeld</option>
                    <option>Sparing</option>
                    <option>Annet</option>
                    <option>Abonnomenter</option>*/}
                </select>

                {/*<button>+ Legg til fast utgift</button>
                <button>+ Legg til</button>*/}
                <button onClick={() => setShowInputRow(true)}>+ Legg til Ny Utgift</button> {/* Viser input raden når vi klikker her */}

            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Dato</th>
                            <th>Kategori</th>
                            <th>Sum</th>
                            <th>Butikk</th>
                            <th>Beskrivelse</th>
                            <th>Handlinger</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showInputRow && (
                            <tr>
                                <td>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newExpense.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <select
                                        name="category"
                                        value={newExpense.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                            Velg kategori
                                        </option>
                                        <option value="food">Mat</option>
                                        <option value="transport">Transport</option>
                                        <option value="house">Bolig</option>
                                        <option value="etc">Annet</option>
                                        <option value="debt">Gjeld</option>
                                        <option value="saving">Sparing</option>
                                        <option value="subscription">Abonnomenter</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="sum"
                                        value={newExpense.sum}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="shop"
                                        value={newExpense.shop}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="description"
                                        value={newExpense.description}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <button style={{ margin: ' 10px', padding: '2px' }} onClick={handleSubmitNewExpense}>Legg til</button>
                                

                            </tr>
                        )}
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                {editExpenseId === expense.id ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="date"
                                                value={newExpense.date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="category"
                                                value={newExpense.category}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="sum"
                                                value={newExpense.sum}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="shop"
                                                value={newExpense.shop}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <textarea
                                                name="description"
                                                value={newExpense.description}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={(e) => handleEditSubmit(e, expense.id)}>Lagre</button>
                                            <button onClick={handleCancelEdit}>Avbryt</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{expense.date}</td>
                                        <td>{expense.category}</td>
                                        <td>{expense.sum.toFixed(2)} kr</td>
                                        <td>{expense.shop}</td>
                                        <td>{expense.description}</td>
                                        <td>
                                            <button onClick={() => handleEditClick(expense)}>Rediger</button>
                                            <button onClick={() => handleDelete(expense.id)}>Slett</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTable;
