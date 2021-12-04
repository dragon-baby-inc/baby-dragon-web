import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faTimes,
  faTimesCircle,
  faEdit,
  faPlus,
  faBars,
  faUser,
  faTrash,
  faFilter,
  faSearch,
  faCheck,
  faArrowLeft,
  faArrowRight,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faCog,
  faLock,
  faLockOpen,
  faHome,
  faClipboard,
  faList,
  faHistory,
  faBook,
} from '@fortawesome/fontawesome-free-solid'
import {
  faCheckDouble,
  faStar as fasFaStar,
} from '@fortawesome/free-solid-svg-icons'
import {
  faClock as farFaClock,
  faStar as farFaStar,
  faCreditCard as farCreditCard,
  faUser as farUser
} from '@fortawesome/free-regular-svg-icons'

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
  faChevronDown: faChevronDown,
  faCog: faCog,
  faLock: faLock,
  faLockOpen: faLockOpen,
  faHome: faHome,
  faClipboard: faClipboard,
  faList: faList,
  faHistory: faHistory,
  faBook: faBook,
  farFaStar: farFaStar,
  fasFaStar: fasFaStar,
  faChevronLeft: faChevronLeft,
  farFaClock: farFaClock,
  farCreditCard: farCreditCard,
  faTimesCircle: faTimesCircle,
  faUser: faUser,
  farUser: farUser,
}

const Icon = (props) => {
  return(
    <FontAwesomeIcon icon={icons[props.faicon]} {...props}/>
  )
}

export default Icon;
