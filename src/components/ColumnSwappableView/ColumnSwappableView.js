import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views';
import Views from './Views/Views'

const ColumnSwappableView = ({
  styles,
  index,
  steps,
  height,
}) => {
  const [_index, setIndex] = useState(0)

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
      height: height ? height : '100%',
      overflow: 'hidden',
    },
    slideContainer: {
      height: height ? height : 'calc(100%  - 49px)',
      margin: 0,
      overflow: 'hidden',
    },
    slide: {
      overflow: 'hidden',
      height: height ? height : 'calc(100%  - 49px)',
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
      <Views steps={steps} index={parseInt(_index)} setIndex={setIndex}/>
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
