import React from "react"
import defaultStyles from './StepsWidgetDotGroup.module.scss'

const StepsWidgetDotGroup = ({
  dotSize,
  index,
  moduleStyles
}) => {
  const _index = index ? index : 0
  const dots = []

  const _styles = moduleStyles ? moduleStyles : defaultStyles

  for(let i = 0; i < dotSize; i ++) {
    if (i !== 0) {
      let line = i <= _index ?
        <li className={[_styles.dotLine, _styles.active].join(' ')}></li>:
        <li className={_styles.dotLine}></li>
        dots.push(line)
    }

    let dot = i <= _index ?
      <li key={i} className={[_styles.dot, _styles.active].join(' ')}></li> :
      <li key={i} className={_styles.dot}></li>
      dots.push(dot)

  }
  return(
    <ul className={_styles.dotGroup}>
      {dots}
    </ul>
  )
}

export default StepsWidgetDotGroup
