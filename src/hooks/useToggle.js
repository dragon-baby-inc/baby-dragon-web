import React, { useState } from "react";
import Toggle from "../components/FormElements/Toggle/Toggle";

const useToggle = ({ initialValue, name, description }) => {
  const [value, setValue] = useState(initialValue ? initialValue : true);

  const handleChange = (e) => {
    setValue(e.target.checked);
  };

  const toggle = (
    <Toggle
      defaultChecked={value}
      changed={handleChange}
      description={description}
      name={name}
    />
  );

  return [value, toggle];
};

export default useToggle;
