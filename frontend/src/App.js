import React, { useState, useEffect } from 'react';

function App() {
  const url = 'http://127.0.0.1:5000/';
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(url) // Update this URL to match your Flask endpoint
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
