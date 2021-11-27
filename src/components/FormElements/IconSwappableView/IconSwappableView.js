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

const IconSwappableView = ({ icons, initial, changed }) => {
  let initialIndex = initial ? initial : 0
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    let initialIndex = initial ? initial : 0
    if (initial) {
      setIndex(initialIndex)
      setLoading(false)
    }
  }, initial)

  const handleIndexChanged = (index, indexLatest, meta) => {
    setIndex(index)
    changed(index)
  }

  const images = []
  let idx = 0

  icons.forEach(url => {
    let current = idx=== index
    idx ++
    images.push(
      <div key={idx} style={current ? Object.assign({}, styles.activeSlide) : Object.assign({}, styles.slide)}>
        <Image size={current ? "120px" : "120px"} imageUrl={url}/>
      </div>
    )
  })


  return(
    <>
      {
        loading ?
          null
        :
          <SwipeableViews style={styles.root}
            index={index}
            slideStyle={styles.slideContainer}
            onChangeIndex={handleIndexChanged} >
            {images}
          </SwipeableViews>
      }
    </>
  )
}

export default IconSwappableView;
