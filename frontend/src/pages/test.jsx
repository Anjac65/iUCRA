import React, { useEffect, useState } from 'react';
import { request } from '@/request';
import axios from 'axios';
import { API_BASE_URL } from '@/config/serverApiConfig';


axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export default function Test() {
    const [distance, setDistance] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            //const response = await fetch('http://localhost:8888/api/sensor/latest');
            //const data = await response.json();
            
                const response = await axios.get('test');
                const data =  response.data;
            console.log(data);
            setDistance(data.distance);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Ultrasonic Sensor Data</h1>
            <p>{distance !== null ? `Distance: ${distance} cm` : 'Loading...'}</p>
        </div>
    );
}

