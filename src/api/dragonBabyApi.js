import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI,
  headers: { 'Content-Type': 'application/json' }
})

class DragonBabyApi {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URI,
      headers: { 'Content-Type': 'application/json' }
    });
    ;
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
}

const dragonBabyApi = new DragonBabyApi();

export { dragonBabyApi };
export default axiosClient;
