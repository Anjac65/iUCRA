function e(e) {
    const t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t);
  }
  
  !function () {
    const t = function (e) {
      const t = document.createElement("script");
      return t.async = !1, t.defer = !0, t.src = e, t;
    }("https://static.soulmachines.com/web-components.1.12.0.js");
  
    const n = function (e) {
      const t = document.createElement("link");
      return t.type = "text/css", t.rel = "stylesheet", t.href = e, t;
    }("https://static.soulmachines.com/web-components.1.12.0.css");
  
    const o = { ...document.currentScript.dataset, ...window.smConfig };
  
    t.onload = () => {
      // Create and append the sm-widget element
      const smWidget = document.createElement("sm-widget");
  
      if (o.smTokenServer) smWidget.setAttribute("token-server", o.smTokenServer);
      if (o.smApiKey) smWidget.setAttribute("api-key", o.smApiKey);
      if (o.smProfilePicture) smWidget.setAttribute("profile-picture", o.smProfilePicture);
      if (o.smGreeting) smWidget.setAttribute("greeting", o.smGreeting);
      if (o.smPosition) smWidget.setAttribute("position", o.smPosition);
      if (o.smLayout) smWidget.setAttribute("layout", o.smLayout);
      
  
      document.body.appendChild(smWidget);

      
      // Wait for the sm-widget to fully load, then simulate the click on connectButton
      
  
      console.log("%cWidget version: 1.12.0", "color: #FFFFFF; font-size: 18px; background: #1E5B98; padding: 10px;");
    };
  
    window.addEventListener("DOMContentLoaded", () => {
        
      e(n);
      e(t);
    });
  }();
  