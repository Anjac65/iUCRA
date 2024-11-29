import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Hologram() {
  const [distance, setDistance] = useState(null);
  const [iframeSrc, setIframeSrc] = useState("http://localhost:3000/news"); // Default src
  const [entity] = useState("news"); // Counter for consecutive low distances

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the distance from your API
        const response = await axios.get('http://localhost:8888/api/test');
        const data = response.data;

        // Update distance state'''''''''''''''''''''''''''''''''''''''''''''''''''''''
        setDistance(data.distance);
      } catch (error) {
        console.error("Error fetching distance:", error);
      }
    };

    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  useEffect(() => {
    if (distance !== null) {
      // Update iframeSrc if the distance is less than 10
      if (distance == "agent" ) {
        // setLowDistanceCount((prevCount) => prevCount + 1); // Increment the counter
        // if (lowDistanceCount === 2) { // 4 because the next increment makes it 5
          setIframeSrc("http://localhost:3000/agents"); // Replace with your alternative URL
          // setLowDistanceCount(0); // Reset counter if condition isn't met
      }
      else {
        setIframeSrc("http://localhost:3000/news");
        // setLowDistanceCount(0); // Reset counter if condition isn't met
    }}

  }, [distance]);

  return (
    <div style={{ height: '100vh', width: '60vw', margin: 0, padding: 0 }}>
      <iframe
        src={iframeSrc} // Use the dynamic iframeSrc
        width="100%"
        height="100%"
        title="Embedded HTML"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
