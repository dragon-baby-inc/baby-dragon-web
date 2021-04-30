import axios from 'axios';

export default axios.create({
  baseURL: 'https://23e6bb90ea5a.ngrok.io/',
  headers: { 'Content-Type': 'application/json' }
})
