import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FlightDetails from './FlightDetails';
import './App.css';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/flights')
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFlights = flights.filter(flight => 
    flight.flight_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Flight Status Dashboard</h1>
      <input
        type="text"
        placeholder="Search by Flight ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Routes>
        <Route
          path="/"
          element={
            <table>
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>Status</th>
                  <th>Gate</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Passengers Info</th>
                </tr>
              </thead>
              <tbody>
                {filteredFlights.length > 0 ? (
                  filteredFlights.map((flight) => (
                    <tr key={flight.flight_id}>
                      <td>{flight.flight_id}</td>
                      <td>{flight.status}</td>
                      <td>{flight.gate}</td>
                      <td>{new Date(flight.departure_time).toLocaleString()}</td>
                      <td>{new Date(flight.arrival_time).toLocaleString()}</td>
                      <td><Link to={`/flight/${flight.flight_id}`}>View details</Link></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        />
        <Route path="/flight/:flightId" element={<FlightDetails />} />
      </Routes>
    </div>
  );
};

export default App;
