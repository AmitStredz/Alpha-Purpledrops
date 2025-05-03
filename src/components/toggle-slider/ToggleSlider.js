import React, { useState } from "react";
import "./ToggleSlider.css";

const ToggleSlider = ({ id }) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="toggle-slider">
      <input
        type="checkbox"
        // id="toggle"
        id={id}
        checked={checked}
        onChange={handleToggle}
        disabled={true}
      />
      <label htmlFor={id} className="slider" />
    </div>
  );
};

export default ToggleSlider;
