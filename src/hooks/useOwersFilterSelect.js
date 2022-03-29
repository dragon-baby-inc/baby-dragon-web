import React, { useState, useEffect } from "react";
import { CheckboxFilterSelect } from "../components";
import { createOwerCheckbokLabel } from "../generators/labelGenerator";

const useOwersFilterSelect = ({
  users,
  buildSelectUsers,
  handleAddCoverCostUser,
  selectedObjects,
  style,
  selectAll,
  callback,
  closed,
}) => {
  const [_selectObjectIds, setSelectObjectIds] = useState([]);

  useEffect(() => {
    if (selectedObjects.length === _selectObjectIds.length) {
      return;
    }

    if (selectedObjects) {
      setSelectObjectIds(
        users
          .filter((u) => {
            return selectedObjects.map((su) => su.id).includes(u.id);
          })
          .map((u) => u.id)
      );
    } else {
      setSelectObjectIds(buildSelectUsers(users));
    }
  }, [users, selectedObjects]);

  const handleSelectChanged = (objects) => {
    setSelectObjectIds(objects.map((obj) => obj.id));
    if (callback) {
      callback(objects.map((obj) => obj.id));
    }
  };

  const select = (
    <CheckboxFilterSelect
      buildSelectUsers={buildSelectUsers}
      closed={closed}
      handleAddCoverCostUser={handleAddCoverCostUser}
      createLabel={createOwerCheckbokLabel}
      selectAll={selectAll}
      objects={users}
      style={style}
      selected_object_ids={_selectObjectIds}
      changed={handleSelectChanged}
    />
  );

  return [_selectObjectIds, select];
};

export default useOwersFilterSelect;
