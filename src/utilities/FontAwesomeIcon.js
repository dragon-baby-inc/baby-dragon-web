import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faTimes,
  faEdit,
  faPlus,
  faBars,
  faTrash,
  faFilter,
  faSearch,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faChevronRight,
  faCog,
  faLock,
  faLockOpen,
  faHome,
} from '@fortawesome/fontawesome-free-solid'
import {
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons'

const icons = {
  faBookOpen: faBookOpen,
  faTimes: faTimes,
  faEdit: faEdit,
  faPlus: faPlus,
  faBars: faBars,
  faTrash: faTrash,
  faFilter: faFilter,
  faSearch: faSearch,
  faCheck: faCheck,
  faCheckDouble: faCheckDouble,
  faArrowLeft: faArrowLeft,
  faArrowRight: faArrowRight,
  faChevronRight: faChevronRight,
  faCog: faCog,
  faLock: faLock,
  faLockOpen: faLockOpen,
  faHome: faHome
}

const Icon = (props) => {
  return(
    <FontAwesomeIcon icon={icons[props.faicon]} {...props}/>
  )
}

export default Icon;
