import React from 'react';
import './AccountPage.css'; 


export default function Preference() {
  return (
    <div className="preference-container">
      <h3 className="title">What's your food preference?</h3>
      <div className="options">
        <label className="option">
          <input
            type="radio"
            name="preference"
            value="non"
            className="radio-input"
          />
          <span className="option-label">🥦🍗Veg & Non Veg Recipe</span>
        </label>
        <label className="option">
          <input
            type="radio"
            name="preference"
            value="egg"
            className="radio-input"
          />
          <span className="option-label">🥚🥦 Veg & Egg Recipe</span>
        </label>
        <label className="option">
          <input
            type="radio"
            name="preference"
            value="veg"
            className="radio-input"
          />
          <span className="option-label">🥦 Veg Recipe</span>
        </label>
      </div>
      <button className="submit-button">
        Submit
      </button>
    </div>
  );
}
