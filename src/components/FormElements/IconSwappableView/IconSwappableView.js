import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Image } from '../../index'

const styles = {
  root: {
    width: '100%',
    margin: 0,
    padding: '0 28vw',
    overflow: 'hidden',
  },
  slideContainer: {
    width: '100%',
    justifyContent: 'center',
    display: "flex",
    alignItems: 'center',
    margin: 0,
    padding: '0 0px',
    height: '100%',
  },
  activeSlide: {
    height: '100%',
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
  let initialIndex = initial ? initial : 1
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    let initialIndex = initial ? initial : 1
    if (initial) {
      setIndex(initialIndex)
      setTimeout(() => {
        setLoading(false)
      }, 400)
    }

  }, initial)

  const handleIndexChanged = (index, indexLatest, meta) => {
    setIndex(index)
    changed(index)
  }

  const images = []
  let idx = 0

  let fakeImages = []

  icons.forEach(url => {
    let current = idx=== index
    idx ++
    images.push(
      <div key={idx} style={current ? Object.assign({}, styles.activeSlide) : Object.assign({}, styles.slide)}>
        <Image size={current ? "120px" : "120px"} imageUrl={url}/>
      </div>
    )

    fakeImages.push(
      <div key={idx} style={Object.assign({}, styles.activeSlide)}>
        <div style={{ backgroundColor: '#EEEEEE', borderRadius: '50%', width: "120px", height: '120px' }}></div>
      </div>
    )
  })


  return(
    <>
      <SwipeableViews style={styles.root}
        index={index}
        slideStyle={styles.slideContainer}
        onChangeIndex={handleIndexChanged} >
        {
          loading ?
            fakeImages : images
        }
      </SwipeableViews>
    </>
  )
}

export default IconSwappableView;

