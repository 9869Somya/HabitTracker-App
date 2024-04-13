import axios from "axios";

class HabitApiService {
  constructor() {
    this.api = String(import.meta.env.VITE_BACKEND_API);
  }
  async addHabit(habit) {
    try {
      const res = await axios.post(`${this.api}/habit`, habit);
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async allHabits() {
    try {
      const res = await axios.get(this.api + "/habit");
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
  async getStreakLogsById(id) {
    try {
      const res = await axios.get(`${this.api}/habit/streakLogs/${id}`);
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
}
const habitApiService = new HabitApiService();
export default habitApiService;
