import React from "react"
import styles from './PageHeader.module.scss'
import { TopLeftIcon, Svg } from '../../index'

const inlineStyles = {
  icon: {
    position: 'relative',
    fontSize: '15px',
    color: 'black',
    textDecoration: "none",
    padding: '18px 14px 22px',
    top: '1px',
  },
  header: {
    paddingLeft: '0px'
  }
}

function PageHeader({
  children,
  faicon,
  color,
  title,
  link
}){
  let classes = [styles.header]
  return(
    <div className={classes.join(' ')} style={faicon ? inlineStyles.header : {}}>
      <div className={styles.innerBlock}>
        {
          faicon ?
            <TopLeftIcon
              link={link}
              style={inlineStyles.icon}
              color={color}>
              <Svg icon='leftArrow' size='24' className='gray900'/>
            </TopLeftIcon>

              : null
        }
        <div className={styles.name}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
