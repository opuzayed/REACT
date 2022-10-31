import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => 
{
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdateUser = event => {
        event.preventDefault();
        console.log(user);

    }

    const handleInputChange = event => {
        const value = event.target.value;
        const field = event.target.name; 
        const newUser = {...user};
        newUser[field] = value;
        setUser(newUser);
        console.log(newUser);
    }


    return (
        <div>
            <h2>Please Update : {storedUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} defaultValue = {storedUser.name} type="text" name="name" id="" placeholder='name' />
                <br />
                <input onChange={handleInputChange} defaultValue = {storedUser.address}type="text" name="address" id="" placeholder='address' />
                <br />
                <input onChange={handleInputChange} defaultValue = {storedUser.email} type="email" name="email" id="" placeholder='email' />
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;