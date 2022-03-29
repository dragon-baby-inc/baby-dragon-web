import React, { useState, useEffect } from "react";
import { RadioSelect, Image, RadioLabel } from "../components";
import { createUserRadioLabel } from "../generators/labelGenerator";

const useUserRadioSelect = ({
  users,
  initialValue,
  callback,
  searchInput,
  key,
}) => {
  const [value, setValue] = useState(initialValue ? initialValue : "");

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleSelectChange = (object) => {
    setValue(object);
    if (callback) {
      callback(object);
    }
  };

  const select = (
    <RadioSelect
      key={key}
      searchInput={searchInput}
      selectedObject={value}
      createLabel={createUserRadioLabel}
      objects={users}
      changed={handleSelectChange}
    />
  );

  return [value, select];
};

export default useUserRadioSelect;

const styles = {
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
