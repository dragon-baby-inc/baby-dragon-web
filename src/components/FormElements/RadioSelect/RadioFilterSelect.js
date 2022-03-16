import React, { useState, useEffect } from "react";
import styles from "./RadioSelect.module.scss";
import { useSearchLabel } from "../../../hooks";

const RadioFilterSelect = ({
  objects,
  createLabel,
  closed,
  changed,
  searchInput,
  selectedObject,
}) => {
  const [displayObjects, setDisplayObjects] = useState(objects);
  const [_selectedObject, setSelectedObject] = useState(selectedObject);

  const handleFilter = (searchTerm) => {
    let filter = searchTerm.toUpperCase();
    let newObjects = objects.filter((user) => {
      return user.displayName.toUpperCase().indexOf(filter) > -1;
    });

    setDisplayObjects(newObjects);
  };

  const [searchValue, searchLabel] = useSearchLabel({
    reset: () => {
      setDisplayObjects(objects);
    },
    changed: handleFilter,
    closed: closed,
  });

  useEffect(() => {
    setSelectedObject(selectedObject);
  }, [selectedObject]);

  useEffect(() => {
    setDisplayObjects(objects);
  }, [objects]);

  let handleChange = (e) => {
    let object = objects.filter((el) => String(el.id) === e.target.value)[0];
    setSelectedObject(object);
    changed(object);
  };

  let objectLabels = displayObjects.map((object) => {
    return createLabel({
      object,
      handleChange,
      selectedObject: _selectedObject,
    });
  });

  const containerStyles = [styles.container];

  return (
    <div className={containerStyles.join(" ")}>
      {searchInput ? searchLabel : null}
      <div className={styles.labels}>{objectLabels}</div>
    </div>
  );
};

export default RadioFilterSelect;
