import styles from './Svg.module.scss'

import {
  Delete,
  Add,
  Edit,
  Person,
  DownArrow,
  Setting,
  Time,
  RightArrow,
  FavorateYes,
  FavorateNo,
  LeftArrow,
  Cancel,
} from './../../assets/icons/index'

const icons = {
  add: Add,
  delete: Delete,
  edit: Edit,
  person: Person,
  downArrow: DownArrow,
  setting: Setting,
  time: Time,
  rightArrow: RightArrow,
  leftArrow: LeftArrow,
  favorateYes: FavorateYes,
  favorateNo: FavorateNo,
  cancel: Cancel,
}

const Svg = (
  props
) => {
  let _size = props.size ? props.size : '16'

  let Component = icons[props.icon]

  const allowed = ['fill', 'stroke'];
  const filteredProps = Object.keys(props)
  .filter(key => allowed.includes(key))
  .reduce((obj, key) => {
    obj[key] = props[key];
    return obj;
  }, {});

  let className = props.className ? props.className : null

  return(
    <div className={styles.container} style={props.style ? props.style : {}} onClick={props.clicked ? props.clicked : () => {}}>
      <Component
        className={styles[className]}
        width={_size}
        height={_size}
        {...filteredProps}
      />
    </div>
  )
}

export default Svg;
