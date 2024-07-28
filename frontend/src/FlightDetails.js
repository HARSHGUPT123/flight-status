import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FlightDetails = () => {
  const { flightId } = useParams();
  const [passengers, setPassengers] = useState([]);
  const [smsMessage, setSmsMessage] = useState('Your flight details have been updated.');

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await fetch('http://localhost:5000/passengers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data[flightId]) {
          setPassengers(data[flightId]);
        } else {
          setPassengers([]);
        }
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };

    fetchPassengers();
  }, [flightId]);

  const sendSms = async (phoneNumber) => {
    try {
      const response = await fetch('http://localhost:5000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to: phoneNumber, message: smsMessage })
      });

      const result = await response.json();
      if (result.success) {
        alert('SMS sent successfully!');
      } else {
        alert('Failed to send SMS: ' + result.error);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Error sending SMS');
    }
  };

  return (
    <div>
      <h2>Passengers for Flight {flightId}</h2>
      <table>
        <thead>
          <tr>
            <th>Passenger ID</th>
            <th>Name</th>
            <th>Seat</th>
            <th>Phone Number</th>
            <th>Send SMS</th>
          </tr>
        </thead>
        <tbody>
          {passengers.length > 0 ? (
            passengers.map((passenger) => (
              <tr key={passenger.passenger_id}>
                <td>{passenger.passenger_id}</td>
                <td>{passenger.name}</td>
                <td>{passenger.seat}</td>
                <td>{passenger.phone_number}</td>
                <td>
                  <button onClick={() => sendSms(passenger.phone_number)}>Send SMS</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No passengers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightDetails;
