import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUsers = () => {
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    midl_name: '',
    name_user: '',
    phone_user: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.1.65/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          midl_name: newUser.midl_name,
          name_user: newUser.name_user,
          phone_user: newUser.phone_user,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('New user added:', result);

      // Можете выполнить дополнительные действия после успешной отправки, например, перенаправление на другую страницу
      navigate('/users');
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={newUser.first_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={newUser.last_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Middle Name:
          <input type="text" name="midl_name" value={newUser.midl_name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="name_user" value={newUser.name_user} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phone_user" value={newUser.phone_user} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUsers;
