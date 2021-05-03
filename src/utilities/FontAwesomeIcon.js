import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faTimes,
  faEdit,
  faPlus,
  faTrash,
  faFilter,
  faSearch
} from '@fortawesome/fontawesome-free-solid'

const icons = {
  faBookOpen: faBookOpen,
  faTimes: faTimes,
  faEdit: faEdit,
  faPlus: faPlus,
  faTrash: faTrash,
  faFilter: faFilter,
  faSearch: faSearch
}

const Icon = (props) => {
  return(
    <FontAwesomeIcon icon={icons[props.faIcon]} {...props}/>
  )
}

export default Icon;
