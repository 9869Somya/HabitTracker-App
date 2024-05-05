import axios from "axios";

class UserApiService {
  constructor() {
    this.api = String(import.meta.env.VITE_BACKEND_API);
  }
  async addUser(newUser) {
    try {
      let res = await axios.post(`${this.api}/user/register`, newUser);
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false, message: error?.response?.data?.message };
    }
  }
  async loginUser(user) {
    try {
      let res = await axios.post(`${this.api}/user/login`, user);
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false, message: error?.response?.data?.message };
    }
  }
}

const userApiService = new UserApiService();
export default userApiService;
