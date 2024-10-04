import React, { useRef, useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import AddNewExpense from './AddNewExpense';
import ImprovedTable from './ImprovedTable';
import BudgetEdit from './EditBudget';

import './OverviewInterface.css';


const OverviewInterface = (

) => {

    const LOGOUT_URL = '/auth/logout';
    const url = 'https://localhost:7062/'

    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState([]);
    const [month, setMonth] = useState([]);
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);

    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef();

    const logoutSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGOUT_URL,
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: { email: user }
                }

            );
            console.log(JSON.stringify(response))
            const token = response?.token;
            localStorage.setItem('token', null);
            setAuth({ user, token })
            setUser('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err.response) {
                setErrMsg('No server response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username')
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized')
            } else {
                setErrMsg('Login failed')
            }
            //errRef.current.focus();
        }
        localStorage.setItem('token', null);
        <Navigate to="/" />
    }

    // Handle delete
    const handleDelete = async (expenseId) => {
        console.log("Expense to be deleted: " + expenseId)
        try {
            const response = await fetch(`https://localhost:7062/expense/delete/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include',
                body: JSON.stringify(expenseId)
            });

            if (!response.ok) {
                throw new Error('Failed to delete expense');
            }


        } catch (error) {
            console.error('Error:', error);
        }
        fetchExpenses()
    };


    const editExpense = async (endpoint, method, payload) => {
        const token = localStorage.getItem('token');
        console.log(payload)
        try {
            const response = await fetch('https://localhost:7062/' + endpoint, { // Bytt ut med din API URL
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: payload,
            });


            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }

            const data = await response.text();

            console.log(data)
        } catch (err) {
            setError(err.message);
            console.error('Error fetching expenses:', err);
        }
        fetchExpenses()
    }



    const fetchExpenses = async () => {
        const token = localStorage.getItem('token');
        console.log("GetAll")
        try {
            const response = await fetch('https://localhost:7062/auth/getall',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                payload: {},
            });

            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }

            const data = await response.json();
            setExpenses(data.expenses);
            setBudget(data.budget);
            setMonth(data.month);
            setUser(data.user)
            console.log(data)
        } catch (err) {
            setError(err.message);
            console.error('Error fetching expenses:', err);
        }
    };





    useEffect(() => {
        fetchExpenses()
    }, []); // Kjør kun ved første rendering

    return (
        <>
            {/* Navbar */}
            <div className="navbar">
                <h1>Oversikt</h1>
                <div className="profile">
                    {/*<form onSubmit={(e) => logoutSubmit(e)}>
                        <button type="submit">Logg ut</button>
                    </form>*/}
                    <span>{user.first_name} {user.last_name}</span>
                    <div className="avatar"></div>
                </div>
            </div>

            {/* Top Section */}
            <div className='top'>
                <div className='header-item'>
                    <h3 style={{ color: budget.sum > month.sum ? 'green' : budget.sum < month.sum ? 'red' : '#000000' }} className='spent'>{month.sum}kr</h3>
                    <h3>Brukt</h3>
                </div>
                <div className='header-item'>
                    <h3 style={{ color: '#000000' }} className='budget'>{budget.sum}kr</h3>
                    <h3>Budsjett</h3>
                </div>
                <div className='header-item'>
                    <h3 style={{ color: budget.sum - month.sum > 0 ? 'green' : budget.sum - month.sum < 0 ? 'red' : '#000000' }} className='remaining'>{budget.sum - month.sum}kr</h3>
                    <h3>Igjen</h3>
                </div>
            </div>

            {/* Title */}


            {/* Category Section */}
            <div className='section'>
                <div className='category-card'>
                    <h3>Bolig</h3>
                    <p style={{ color: budget.house - month.house > 0 ? 'green' : budget.house - month.house < 0 ? 'red' : '#000000', fontWeight: 'bold' }} className="spent">{budget.house - month.house} kr</p>

                    <p>Brukt {month.house} kr</p>
                    <p>Budsjett {budget.house} kr</p>
                </div>
                <div className='category-card'>
                    <h3>Mat</h3>
                    <p style={{ color: budget.food - month.food > 0 ? 'green' : budget.food - month.food < 0 ? 'red' : '#000000', fontWeight: 'bold' }} className="spent">{budget.food - month.food} kr</p>

                    <p>Brukt {month.food} kr</p>
                    <p>Budsjett {budget.food} kr</p>
                </div>
                <div className='category-card'>
                    <h3>Transport</h3>
                    <p style={{ color: budget.transport - month.transport > 0 ? 'green' : budget.transport - month.transport < 0 ? 'red' : '#000000', fontWeight: 'bold' }} className="spent">{budget.transport - month.transport} kr</p>

                    <p>Brukt {month.transport} kr</p>
                    <p>Budsjett {budget.transport} kr</p>
                </div>
                <div className='category-card'>
                    <h3>Gjeld</h3>
                    <p style={{ color: budget.debt - month.debt > 0 ? 'green' : budget.debt - month.debt < 0 ? 'red' : '#000000', fontWeight: 'bold' }} className="spent">{budget.debt - month.debt} kr</p>

                    <p>Brukt {month.debt} kr</p>
                    <p >Budsjett {budget.debt} kr</p>
                </div>
                <div className='category-card'>
                    <h3>Sparing</h3>
                    <p style={{ color: budget.saving - month.saving > 0 ? 'green' : budget.saving - month.saving < 0 ? 'red' : '#000000', fontWeight: 'bold' }} className="spent">{budget.saving - month.saving} kr</p>

                    <p>Brukt {month.saving} kr</p>
                    <p>Budsjett {budget.saving} kr</p>
                </div>
                <div className='category-card'>
                    <h3>Annet</h3>
                    <p style={{ color: budget.etc - month.etc > 0 ? 'green' : budget.etc - month.etc < 0 ? 'red' : '#000000', fontWeight: 'bold' }} className="spent">{budget.etc - month.etc} kr</p>

                    <p>Brukt {month.etc} kr</p>
                    <p>Budsjett {budget.etc} kr</p>
                </div>

                {/* Add more category cards here */}
            </div>

            <ImprovedTable expenses={expenses} editExpense={editExpense} handleDelete={handleDelete} last={editExpense} fetchData={fetchExpenses} />
            <BudgetEdit budget={budget} handleSubmit={editExpense} />
        </>
    );
};

export default OverviewInterface;
