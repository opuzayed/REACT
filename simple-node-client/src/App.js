import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[]);

  return (
    <div className="App">
      <h3>Users : {users.length}</h3>
    </div>
  );
}

export default App;
