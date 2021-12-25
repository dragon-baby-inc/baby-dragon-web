import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views';
import DotGroup from './StepsWidgetDotGroup'

const StepsWidget = ({
  styles,
  index,
  steps,
  height,
}) => {
  const [_index, setIndex] = useState(index)

  useEffect(() => {
    setIndex(index)
  }, [index])

  const handleIndexChanged = (index, indexLatest, meta) => {
    setIndex(index)
  }

  const defaultStyles = {
    root: {
      margin: 0,
      height: height,
      overflow: 'hidden',
    },
    slideContainer: {
      margin: 0,
      height: '100%',
    },
    slide: {
      margin: 0,
      overflow: 'hidden',
      height: '100%',
      backgroundColor: '#FFFFFF',
    },
  };

  const _styles = styles ? styles : defaultStyles
  const stepsComponents = []
  steps.forEach(step => {
    stepsComponents.push(
      <div style={Object.assign({}, _styles.slide)}>
        {step.component}
      </div>
    )
  })

  return (
    <>
      <DotGroup index={_index} dotSize={stepsComponents.length}/>
      <SwipeableViews style={_styles.root}
        disabled={true}
        index={_index}
        slideStyle={_styles.slideContainer}
        onChangeIndex={handleIndexChanged} >
        {stepsComponents}
      </SwipeableViews>
    </>
  )
}

export default StepsWidget
