import "./spinner.css";

import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
        <p>...Chargement</p>
    </div>
  );
}