import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = user => {
        const agree = window.confirm(`Are you sure you want to delete ${user.name}`)
        console.log(agree);
        if(agree){
           fetch(`http://localhost:5000/users/${user._id}`, {
                    method:'DELETE'
           })
           .then(res => res.json())
           .then(data => {
                if(data.deletedCount > 0){
                alert('user deleted successfully');
                const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                setDisplayUsers(remainingUsers);
            }
        });
        }
        
    }
    return (
        <div>
            <h2>Users : {displayUsers.length}</h2>
            {
                    displayUsers.map(user => <p key={user._id}>
                    {user.name} {user.email} <button onClick={() =>handleDelete(user)}>X</button>
                </p>)
            }
        </div>
    );
};

export default Home;