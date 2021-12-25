import React from 'react';
import styles from './ColorBlock.module.scss'

const ColorBlock = ({
  circle,
  imageSize,
  color,
  style,
  children,
  blockStyle
}) => {
  const defaultStyle = {
    image: {
      width: imageSize ? imageSize : "56px",
      height: imageSize ? imageSize : "56px",
      background: color ? color : "linear-gradient(92.29deg, #88631C 0%, #C5AF85 100%)"
    }
  }

  let _style = style ? style : defaultStyle

  if (!blockStyle) { blockStyle = {} }
  return (
    <div className={styles.imageBlock} style={blockStyle}>
      <div
        style={_style.image}
        className={styles.image} >
        {
          children ?
            <div className={styles.children}>
              {children}
            </div> : null
        }
      </div>
    </div>
  )
};

export default ColorBlock;
