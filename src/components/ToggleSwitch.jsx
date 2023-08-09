import React, { useState } from 'react';
import ReactSwitch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export function ToggleSwitch() {
  const [checked, setChecked] = useState(true);

  const handleChange = val => {
    setChecked(val)
  }

  return (
    <div className="app" style={{textAlign: "center"}}>
      <FontAwesomeIcon icon={faUser} />
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
}