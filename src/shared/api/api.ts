import { REST_URL } from './config'
import axios from 'axios'

export const $api = axios.create({
  baseURL: REST_URL
})
