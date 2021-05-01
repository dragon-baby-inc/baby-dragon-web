import axios from 'axios';

export default axios.create({
  baseURL: 'https://de5231fb891f.ngrok.io/',
  headers: { 'Content-Type': 'application/json' }
})
