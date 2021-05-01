import React, { useState } from "react"
import { BulletList  } from 'react-content-loader'
import Loader from "react-spinners/SyncLoader";

const styles = {
  bg: {
    padding: '40px'
  }
}

function Loading(){

  return(
    <div style={styles.bg}>
      <BulletList />
      <BulletList />
      <BulletList />
    </div>
  )
}

export default Loading
