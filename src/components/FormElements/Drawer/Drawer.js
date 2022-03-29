import React from "react";
import Drawer from "@mui/material/Drawer";
import "./Drawer.scss";

const myDrawer = ({ open, children, closed }) => {
  return (
    <Drawer anchor="bottom" onClose={closed} open={open}>
      {children}
    </Drawer>
  );
};

export default myDrawer;
