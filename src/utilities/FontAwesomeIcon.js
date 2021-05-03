import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faTimes,
  faEdit,
  faPlus,
  faTrash,
  faFilter,
  faSearch,
  faCheck,
} from '@fortawesome/fontawesome-free-solid'
import {
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons'

const icons = {
  faBookOpen: faBookOpen,
  faTimes: faTimes,
  faEdit: faEdit,
  faPlus: faPlus,
  faTrash: faTrash,
  faFilter: faFilter,
  faSearch: faSearch,
  faCheck: faCheck,
  faCheckDouble: faCheckDouble
}

const Icon = (props) => {
  return(
    <FontAwesomeIcon icon={icons[props.faIcon]} {...props}/>
  )
}

export default Icon;
