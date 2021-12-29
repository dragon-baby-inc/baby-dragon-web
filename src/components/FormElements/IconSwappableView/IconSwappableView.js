import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Image } from '../../index'

const _styles = {
  root: {
    margin: 0,
    padding: '0 28%',
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

const IconSwappableView = ({ styles, icons, initial, changed, imageSize }) => {
  let initialIndex = initial ? initial : 1
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(initialIndex)

  if (styles) {
    styles = { ..._styles, ...styles }
  } else {
    styles = _styles
  }

  useEffect(() => {
    if (initial !== undefined) {
      setIndex(initial)
      setTimeout(() => {
        setLoading(false)
      }, 200)
    }

  }, [initial])

  const handleIndexChanged = (index, indexLatest, meta) => {
    setTimeout(() => {
      setIndex(index)
      changed(index)
    }, 10)
  }

  const images = []
  let idx = 0
  let fakeImages = []

  if(!imageSize) { imageSize = '120px' }

  icons.forEach(url => {
    let current = idx=== index
    idx ++
    images.push(
      <div key={idx} style={current ? Object.assign({}, styles.activeSlide) : Object.assign({}, styles.slide)}>
        <Image size={imageSize} imageUrl={url}/>
      </div>
    )

    fakeImages.push(
      <div key={idx} style={Object.assign({}, styles.activeSlide)}>
        <div style={{ backgroundColor: '#EEEEEE', borderRadius: '50%', width: imageSize, height: imageSize }}></div>
      </div>
    )
  })

  return(
    <>
      <SwipeableViews
        enableMouseEvents
        style={styles.root}
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

