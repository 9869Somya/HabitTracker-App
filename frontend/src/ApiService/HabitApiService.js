import axios from "axios";

class HabitApiService {
  constructor() {
    this.api = String(import.meta.env.VITE_BACKEND_API);
  }
  async addHabit(habit, token) {
    try {
      const res = await axios.post(`${this.api}/habit`, habit, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async allHabits(token) {
    try {
      const res = await axios.get(this.api + "/habit", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async getHabitById(id, token) {
    try {
      const res = await axios.get(`${this.api}/habit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      return { data: res.data[0], status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
  async getStreakLogsById(id, token) {
    try {
      const res = await axios.get(`${this.api}/habit/streakLogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
  async getHabitFrequencyById(id, token) {
    try {
      const res = await axios.get(`${this.api}/habit/frequency/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
  async updateHabit(id, frequency, token) {
    try {
      const res = await axios.put(`${this.api}/habit/${id}`, frequency, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
  async deleteHabit(id, token) {
    try {
      const res = await axios.delete(`${this.api}/habit/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      return { data: res.data, status: true };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }
  async updateStatus(id, date, token) {
    try {
      const res = await axios.put(`${this.api}/habit/streakLogs/${id}/${date}`);

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
