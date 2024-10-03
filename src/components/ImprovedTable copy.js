import React, { useState } from 'react';

const ExpensesTable = ({ expenses, editExpense }) => {
    // State for å håndtere ny utgift data
    const [newExpense, setNewExpense] = useState({
        date: '',
        category: '',
        sum: '',
        shop: '',
        description: ''
    });

    // State for å vise eller skjule input raden
    const [showInputRow, setShowInputRow] = useState(false);

    // Håndtere input endringer
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExpense((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Håndtere innsending av ny utgift
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
        editExpense('expense/create', 'POST', JSON.stringify(payload)); // Sender data til API for å legge til utgift
        setNewExpense({ date: '', category: '', sum: '', shop: '', description: '' }); // Tilbakestille input
        setShowInputRow(false); // Skjuler input raden etter innsending
    };

    return (
        <>
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

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Dato</th>
                            <th>Kategori</th>
                            <th>Sum</th>
                            <th>Butikk</th>
                            <th>Beskrivelse</th>
                            {/*<th>Endre</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ny input rad */}
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
                                <button style={{ margin: ' 10px', padding: '2px' }} onClick={handleSubmitNewExpense}>Endre</button>
                                

                            </tr>
                        )}

                        {/* Viser eksisterende utgifter */}
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.date}</td>
                                <td>{expense.category}</td>
                                <td>{expense.sum.toFixed(2)} kr</td> {/* Formatere sum med to desimaler */}
                                <td>{expense.shop}</td>
                                <td>{expense.description}</td>
                                <button style={{ margin: ' 5px', padding: '2px' }} onClick={() => {  }}>Endre</button>
                                <button style={{ margin: ' 5px', padding: '2px' }} onClick={() => { editExpense('expense/delete', 'DELETE', JSON.stringify(expense.id)) }}>Slett</button>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ExpensesTable;
