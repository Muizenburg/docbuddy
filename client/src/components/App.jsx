import React from "react";
import pic from "./../images/medoc.jpg";

const App = () => {
  return (
    <div className="col-md-6 offset-md-3 text-center">
      <h1>ABOUT US</h1>
      <img alt="doc pic" src={pic} style={{ width: 300 }} />

      <hr />

      <p>
        Welcome to your doctors appointment booking app. Beat the queue and save
        valuable time by booking ahead on this app.
      </p>
    </div>
  );
};

export default App;
