import axios from 'axios';

export default axios.create({
  baseURL: process.env.BACKEND_URI,
  headers: { 'Content-Type': 'application/json' }
})
