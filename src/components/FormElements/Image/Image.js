import React from "react";
import { userImageUrls as imageUrls } from "../../../constants";
import styles from "./Image.module.scss";

const Image = ({
  imageUrl,
  size,
  circle,
  defaultImage,
  clicked,
  avatarStyles,
  style,
}) => {
  let imageSize = size;
  if (!imageSize) {
    imageSize = "40px";
  }

  const defaultImageUrl = {
    user: "https://storage.googleapis.com/baby-dragon/public/dummy_user_L.png",
    accountingBook:
      "https://storage.googleapis.com/baby-dragon/public/AccountingBookIcon/AccoutingBookIcon-white.jpg",
  };

  if (imageUrl && imageUrl.length < 10) {
    imageUrl = imageUrls[imageUrl];
  }

  const inlineStyle = {
    image: {
      width: imageSize,
      height: imageSize,
      borderRadius: circle ? "50%" : "100%",
    },
  };

  return (
    <div
      onClick={clicked}
      className={styles.imageBlock}
      style={style ? style : {}}
    >
      {imageUrl ? (
        <img
          style={inlineStyle.image}
          className={styles.image}
          src={imageUrl}
          alt="user"
        />
      ) : (
        <img
          style={inlineStyle.image}
          className={styles.image}
          src={
            defaultImageUrl[defaultImage]
              ? defaultImageUrl[defaultImage]
              : "https://storage.googleapis.com/baby-dragon/public/DummyImage.png"
          }
          alt={defaultImage}
        />
      )}
    </div>
  );
};

export default Image;
