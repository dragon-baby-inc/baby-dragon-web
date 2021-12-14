import React from 'react';
import { themeColors } from '../../../constants'
import { FontAwesomeIcon } from '../../index'
import styles from './ColorBlock.module.scss'

const ColorBlock = ({
  circle,
  imageSize,
  style,
  children
}) => {
  const defaultStyle = {
    image: {
      width: imageSize ? imageSize : "56px",
      height: imageSize ? imageSize : "56px",
      background: "linear-gradient(92.29deg, #88631C 0%, #C5AF85 100%)"
    }
  }

  let _style = style ? style : defaultStyle

  return (
    <div className={styles.imageBlock}>
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
