import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Image } from '../../index'

const styles = {
  root: {
    margin: 0,
    padding: '0 28vw',
    overflow: 'hidden',
  },
  slideContainer: {
    justifyContent: 'center',
    display: "flex",
    alignItems: 'center',
    margin: 0,
    padding: '0 0px',
    height: '100%',
  },
  activeSlide: {
    margin: 0,
    overflow: 'hidden',
    height: '100%',
    transition: '.2s',
  },
  slide: {
    margin: 0,
    overflow: 'hidden',
    height: '100%',
    opacity: '50%',
    transition: '.2s',
  },
};

const IconSwappableView = ({ icons }) => {
  const [index, setIndex] = useState(0)

  const handleIndexChanged = (index, indexLatest, meta) => {
    setIndex(index)
    console.log(index)
  }
  const images = []

  icons.forEach(i => {
    let current = i === index
    images.push(
      <div key={i} style={current ? Object.assign({}, styles.activeSlide) : Object.assign({}, styles.slide)}>
        <Image size={current ? "120px" : "120px"}/>
      </div>
    )
  })


  return(
    <SwipeableViews style={styles.root}
      index={index}
      slideStyle={styles.slideContainer}
      onChangeIndex={handleIndexChanged} >
      {images}
    </SwipeableViews>
  )
}

export default IconSwappableView;
