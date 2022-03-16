import React from "react";
import { themeColors } from "../constants";

const SorryPage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={{ padding: "4px" }}>sorry, something went wrong.</div>
        <div>Please try again.</div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    width: "100%",
    height: "100vh",
    backgroundColor: themeColors.green700,
  },
  container: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    left: "50%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    width: "calc(100%)",
    borderRadius: "16px",
    textAlign: "center",
    color: themeColors.white,
  },
};

export default SorryPage;
