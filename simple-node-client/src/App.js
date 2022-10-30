import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[]);

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email};
    console.log(user);
    fetch('http://localhost:5000/users', {
     method : 'POST',
     headers : {
      'Content-Type' : 'application/json',
     },
     body : JSON.stringify(user), 
    })
    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data];
      setUsers(newUsers);
    })
    .catch(error => console.error(error))

    form.reset();
  }

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" placeholder='Enter your name'/>
        <br />
        <input type="email" name="email" id="" placeholder='Enter your email'/>
        <br />
        <button type="submit">Add User</button>
      </form>
      <h3>Users : {users.length}</h3>
      {
        users.map(user => <p key={user.id}>{user.name} {user.email}</p>)
      }
    </div>
  );
}

export default App;
