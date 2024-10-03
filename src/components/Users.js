import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        let isMonted = true;
        const controller = new AbortController();
        
        const getUsers = async () => {
            try {
                // endre denne til mitt api
                const response = await axios.get('/user/getall', {
                    signal: controller.signal
                })
                console.log(response.data);
                isMonted && setUsers(response.data);
            } catch (err) {
                console.error(err)
            }
        }
        getUsers();

        return () => {
            isMonted = false;
            controller.abort();
        }

    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
            ? (
                <ul>
                    {users.map((user, i) => 
                    <li key={i}>{user?.username}</li>)}
                </ul>
            ) : <p>Mp users to display</p>
        }
        </article>
    )
}
export default Users;