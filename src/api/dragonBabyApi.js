import axios from 'axios';

export default axios.create({
  baseURL: 'https://dragon-baby-api.jp.ngrok.io/',
  headers: { 'Content-Type': 'application/json' }
})
