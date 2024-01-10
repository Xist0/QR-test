import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch('http://192.168.1.65/api/users')
      .then(res => res.json())
      .then(json => {
        setData(json)
      })
  }, [])


  return (
    <div>
      <h1>dsadsa</h1>
      {data.map((elem) => (
        <div className='elem'>
          <p>{elem.id_user}</p>
          <p>{elem.first_name}</p>
          <p>{elem.last_name}</p>
          <p>{elem.midl_name}</p>
          <p>{elem.name_user}</p>
          <p>{elem.phone_user}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
