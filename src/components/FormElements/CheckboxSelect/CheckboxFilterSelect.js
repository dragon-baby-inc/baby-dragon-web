import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./CheckboxFilterSelect.module.scss";
import { Warning, SearchInput, CheckboxLabel, Separater } from "../index";

const CheckboxFilterSelect = ({
  objects,
  buildSelectUsers,
  selected_object_ids,
  handleAddCoverCostUser,
  handleNavigateUsers,
  style,
  createLabel,
  selectAll,
  changed,
  closed,
}) => {
  const [mount, setMount] = useState(false); /* eslint-disable no-unused-vars */
  const [_selectAll, setSelectAll] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [displayObjects, setDisplayObjects] = useState([]);
  const { group_id, accounting_book_id } = useParams();

  const handleFilter = (e) => {
    let searchTerm = e.target.value;

    setSearchValue(searchTerm);

    let filter = searchTerm.toUpperCase();
    let newObjects = objects.filter((user) => {
      return user.displayName.toUpperCase().indexOf(filter) > -1;
    });

    setDisplayObjects(newObjects);
  };

  const handleReset = () => {
    setSearchValue("");
    setDisplayObjects(objects);
  };

  const searchInput = (
    <SearchInput
      reset={handleReset}
      filtered={handleFilter}
      value={searchValue}
      closed={closed}
      checkbox={true}
    />
  );

  useEffect(() => {
    setMount(true);
    if (selected_object_ids.length === selectedObjects.length) {
      setSelectAll(
        buildSelectUsers(objects).length === selected_object_ids.length
      );
      return;
    }

    setSelectedObjects(
      objects.filter((el) => selected_object_ids.includes(el.id))
    );
    setSelectAll(
      buildSelectUsers(objects).length === selected_object_ids.length
    );
  }, [objects, selected_object_ids]);

  useEffect(() => {
    setDisplayObjects(objects);
  }, [objects]);

  let handleChange = (e) => {
    let selected_objects = selectedObjects;
    if (e.target.checked) {
      selected_objects.push(
        ...objects.filter(
          (object) => String(object.id) === String(e.target.value)
        )
      );
    } else {
      selected_objects = selected_objects.filter(
        (object) => String(object.id) !== String(e.target.value)
      );
    }

    setSelectedObjects(selected_objects);
    changed(selected_objects);
  };

  let objectLabels = displayObjects.map((object) => {
    return createLabel({
      object,
      handleChange,
      selectedObjects,
      handleAddCoverCostUser,
    });
  });

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);

    if (e.target.checked) {
      let validSeletedIds = buildSelectUsers(displayObjects);
      setSelectedObjects(
        displayObjects.filter((u) => validSeletedIds.includes(u.id))
      );
      changed(displayObjects.filter((u) => validSeletedIds.includes(u.id)));
    } else {
      setSelectedObjects([]);
      changed([]);
    }
  };

  const containerStyles = [styles.container];
  if (mount) {
    containerStyles.push(styles.mount);
  }
  return (
    <div style={style ? style : {}} className={containerStyles.join(" ")}>
      {searchInput}
      <Warning>
        <>
          找不到成員？去
          <a
            style={{ color: "#88631C", textDecoration: "underline" }}
            href={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/default_users`}
          >
            分帳成員
          </a>
          設定看看喔！
        </>
      </Warning>
      {selectAll ? (
        <>
          <CheckboxLabel
            value="select-all"
            changed={handleSelectAll}
            checked={_selectAll}
          >
            <div className={styles.selectAll}>所有人</div>
          </CheckboxLabel>
          <Separater style={{ margin: 0 }} />
        </>
      ) : null}
      <div className={styles.labels}>{objectLabels}</div>
    </div>
  );
};

export default CheckboxFilterSelect;
