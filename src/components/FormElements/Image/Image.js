import React from 'react';
import { themeColors } from '../../../constants'
import { FontAwesomeIcon } from '../../index'
import styles from './Image.module.scss'

const Image = ({
  imageUrl,
  size,
  circle,
  defaultImage,
  clicked
}) => {
  let imageSize = size
  if (!imageSize) { imageSize = '40px'  }

  const defaultImageUrl = {
    user: "https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png",
    accountingBook: "https://storage.googleapis.com/baby-dragon/public/DummyImage.png"
  }

  const style = {
    image: {
      width: imageSize,
      height: imageSize,
      borderRadius: circle ? "50%" : "100%"
    }
  }

  return (
    <div onClick={clicked} className={styles.imageBlock}>
      {
        imageUrl ?
          <img
            style={style.image}
            className={styles.image}
            src={imageUrl}
            alt="user"
          />
          :
          <img
            style={style.image}
            className={styles.image}
            src={defaultImageUrl[defaultImage] ? defaultImageUrl[defaultImage] : "https://storage.googleapis.com/baby-dragon/public/DummyImage.png"}
            alt={defaultImage}
          />
      }
    </div>
  )
};

export default Image;
