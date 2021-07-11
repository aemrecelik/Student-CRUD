import axios from "axios";

const url = "http://localhost:8080/api/cities";

export default class CityService {
  getAllCities() {
    return axios.get(url);
  }
}
