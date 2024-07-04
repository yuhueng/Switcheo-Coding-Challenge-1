import React, { useState, useEffect } from 'react';

const Table = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      // Fetch data from the JSON file
      fetch('/prices.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched data:', data); // Log fetched data
          setData(data);
        })}, []);
  
    return (
      <div className="table-container">
        <p className='light-text'>List of Currency Available:</p>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Currency</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.currency}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    );
  };

export default Table;
