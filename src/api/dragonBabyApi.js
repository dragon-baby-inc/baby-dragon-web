import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI,
  headers: { 'Content-Type': 'application/json' }
})

class DragonBabyApi {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.DRAGONBABY_API_SECRET
      }
    });
    ;
  }

  exchangeToken(token, data) {
    console.log({ ...data, access_token: token })
    return this.api.post(`api/v1/tokens`, { ...data, access_token: token })
  }

  getPayment(group_id, accounting_book_id, payment_id) {
    return this.api.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments/${payment_id}`)
  }

  createPayment(group_id, accounting_book_id, params) {
    return this.api.post(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/payments`, { payment: params })
  }

  updateUser(group_id, user_id, params) {
    return this.api.patch(`api/v1/groups/${group_id}/users/${user_id}`, params)
  }

  deleteUser(group_id, user_id, params) {
    return this.api.delete(`api/v1/groups/${group_id}/users/${user_id}`)
  }

  createUser(group_id, params) {
    return this.api.post(`api/v1/groups/${group_id}/users`, params)
  }

  getUsers(group_id) {
    return this.api.get(`api/v1/groups/${group_id}/users`)
  }

  getAccountingBook(group_id, accounting_book_id) {
    return this.api.get(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}`)
  }

  createAccountingBook(group_id, params) {
    return this.api.post(`api/v1/groups/${group_id}/accounting_books`, { accounting_book: params })
  }

  updateAccountingBook(group_id, accounting_book_id, params) {
    return this.api.patch(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}`, params)
  }

  updateCurrentAccountingBook(group_id, accounting_book_id) {
    return this.api.patch(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/set_as_current`)
  }

  deleteAccountingBook(group_id, accounting_book_id) {
    return this.api.delete(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}`)
  }

  updateCoverCostUsers(group_id, accounting_book_id, ids) {
    return this.api.post(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/users`, { accounting_book_user_ids: ids })
  }

  updateCoverCostUser(group_id, accounting_book_id, ids) {
    return this.api.post(`api/v1/groups/${group_id}/accounting_books/${accounting_book_id}/user`, { accounting_book_user_ids: ids })
  }
}

const dragonBabyApi = new DragonBabyApi();

export { dragonBabyApi };
export default axiosClient;
