import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import SoulMachinesEmbed from '@/components/SoulMachinesEmbed';
import React, { useEffect } from 'react';
import useLanguage from '@/locale/useLanguage';

export default function Agents() {
  const translate = useLanguage();

  // Function to request fullscreen mode
  const openFullscreen = () => {
    const elem = document.documentElement; // Fullscreen for the whole document
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // For Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // For Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // For IE/Edge
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    
    const iframe = document.querySelector('iframe');
        if(iframe){
            console.log('iframe')
            iframe.onload = () => {
                // Wait for iframe to load, then access its contents
                const iframeDocument = iframe.contentWindow.document;
                
                // Now, search for sm-widget inside the iframe
                const smWidget = iframeDocument.querySelector('sm-widget');
                if (smWidget) {
                  console.log('sm-widget is inside the iframe:', smWidget);
                  const button = smWidget.querySelector('[data-sm-cy="connectButton"]');
                  if (button) {
                    console.log(button);
                    button.click();
                    setTimeout(() => {
                      const test = iframeDocument.querySelector('[id="headlessui-portal-root"]');
                    console.log(test)
                    const unmute = test.querySelector('[aria-label="Unmute video"]');
                    if (unmute) {
                      console.log(unmute);
                      unmute.click();
                    }
                    const mic = test.querySelector('[aria-label="Enable microphone"]');
                    if (mic) {
                      console.log(mic);
                      mic.click();
                    }
                    }, 10000); // Adjust the timeout as needed
                    
                    
                    
                  }
                }
              };
        }

    

    

    // Call the fullscreen function when the component mounts
    openFullscreen();
  }, []); // Empty dependency array means this runs once after the first render

  return (
        <SoulMachinesEmbed />
        
  );
}
