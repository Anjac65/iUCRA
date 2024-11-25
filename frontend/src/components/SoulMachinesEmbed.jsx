// // import React, { useEffect } from 'react';
// // import axios from 'axios';

// // const SoulMachinesEmbed = () => {
// //     useEffect(() => {
// //         const loadSoulMachine = async () => {
// //             try {
// //                 // Fetch config from backend
// //                 const res = await axios.get('/soulmachines/config');
// //                 const { apiKey, position, greeting, layout, profilePicture } = res.data;

// //                 // Dynamically create script tag
// //                 const script = document.createElement('script');
// //                 script.src = 'https://static.soulmachines.com/widget-snippet-1.12.0.min.js';
// //                 script.async = true;
// //                 script.setAttribute('data-sm-api-key', apiKey);
// //                 script.setAttribute('data-sm-position', position);
// //                 script.setAttribute('data-sm-greeting', greeting);
// //                 script.setAttribute('data-sm-layout', layout);
// //                 script.setAttribute('data-sm-profile-picture', profilePicture);

// //                 // Append the script to the document body
// //                 document.body.appendChild(script);

// //                 // Cleanup the script on component unmount
// //                 return () => {
// //                     document.body.removeChild(script);
// //                 };
// //             } catch (error) {
// //                 console.error('Error loading Soul Machines widget:', error);
// //             }
// //         };

// //         loadSoulMachine();
// //     }, []);

// //     return (
// //         // <div id="soul-machine-widget"></div>
// //     //     <div>
// //     //     <h1>SM Widget Example</h1>
// //     //   </div>
// //     );
// // };

// // export default SoulMachinesEmbed;
// import React, { useEffect } from 'react';

// const SoulMachinesEmbed = () => {
//   useEffect(() => {
//     const loadSoulMachine = async () => {
//       try {
//         // You can hardcode these values temporarily to test the widget.
//         const apiKey = 'eyJzb3VsSWQiOiJkZG5hLWl1Y3JhYThlMy0taXVjcmEiLCJhdXRoU2VydmVyIjoiaHR0cHM6Ly9kaC5zb3VsbWFjaGluZXMuY2xvdWQvYXBpL2p3dCIsImF1dGhUb2tlbiI6ImFwaWtleV92MV9hMzJhM2IwMy1lY2ViLTRmMTMtYjg3Ni1lNGExN2ViZWM3MGQifQ=='; // Replace with a valid API key.
//         const position = 'bottom-right';
//         const greeting = 'Welcome';
//         const layout = 'default';
//         const profilePicture = 'default';

//         // Check if script already exists to avoid duplicate loading
//         if (!document.getElementById('soul-machine-widget')) {
//           // Dynamically create script tag
//           const script = document.createElement('script');
//           script.id = 'soul-machine-widget';
//           script.src = 'https://static.soulmachines.com/widget-snippet-1.12.0.min.js';
//           script.async = true;
//           script.setAttribute('data-sm-api-key', apiKey);
//           script.setAttribute('data-sm-position', position);
//           script.setAttribute('data-sm-greeting', greeting);
//           script.setAttribute('data-sm-layout', layout);
//           script.setAttribute('data-sm-profile-picture', profilePicture);

//           // Log configuration to debug
//           console.log('Soul Machines script config:', {
//             apiKey,
//             position,
//             greeting,
//             layout,
//             profilePicture,
//           });

//           // Append the script to the document body
//           document.body.appendChild(script);
//         }

//         // Cleanup the script on component unmount
//         return () => {
//           const scriptElement = document.getElementById('soul-machine-widget');
//           if (scriptElement) {
//             document.body.removeChild(scriptElement);
//           }
//         };
//       } catch (error) {
//         console.error('Error loading Soul Machines widget:', error);
//       }
//     };

//     loadSoulMachine();
//   }, []);

//   return <div id="soul-machine-container"></div>;
// };

// export default SoulMachinesEmbed;
import React, { useEffect } from 'react';

const SoulMachinesEmbed = () => {

  return (
    <div style={{ height: '75vh', width: '75vw', margin: 0, padding: 0 }}>
      <iframe
        src="/embended.html"  // Path to the HTML file in the public folder
        width="100%" 
        height="100%" 
        title="Embedded HTML"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default SoulMachinesEmbed;

