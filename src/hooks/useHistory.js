import { useHistory } from "react-router-dom";

const Hook =  () => {
  const history = useHistory();

  const navigate = (url) => {
    history.push(url)
  }

  return [navigate];
}

export default Hook;
