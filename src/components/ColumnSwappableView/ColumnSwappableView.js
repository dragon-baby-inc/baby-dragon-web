import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views';
import Views from './Views/Views'

const ColumnSwappableView = ({
  styles,
  index,
  steps,
  callback,
  height,
}) => {
  const [_index, setIndex] = useState(0)

  const handleIndexChanged = (value) => {
    setIndex(value)
    if (callback) { callback(value) }
  }

  useEffect(() => {
    if (index) {
      setIndex(index)
    }
  }, [index])

  const defaultStyles = {
    root: {
      flexGrow: 1,
      maxHeight: '-webkit-fill-available',
      margin: 0,
      height: height ? `calc(${height} - 49px)` : 'calc(100%  - 49px)',
      overflow: 'hidden',
    },
    slideContainer: {
      height: `calc(100%)`,
      margin: 0,
      overflow: 'hidden',
    },
    slide: {
      overflow: 'hidden',
      height: `calc(100%)`,
      backgroundColor: '#FFFFFF',
    },
  };

  const _styles = styles ? { ...defaultStyles, ...styles } : defaultStyles
  const stepsComponents = []

  steps.forEach(step => {
    stepsComponents.push(
      <div key={step.name} style={Object.assign({}, _styles.slide)}>
        {step.component}
      </div>
    )
  })

  return (
    <>
      <Views steps={steps} index={parseInt(_index)} setIndex={handleIndexChanged}/>
      <SwipeableViews style={_styles.root}
        disabled={true}
        index={parseInt(_index)}
        slideStyle={_styles.slideContainer}>
        {stepsComponents}
      </SwipeableViews>
    </>
  )
}

export default ColumnSwappableView
