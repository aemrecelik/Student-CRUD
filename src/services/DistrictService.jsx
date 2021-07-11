import axios from "axios";

const url = "http://localhost:8080/api/districts";

export default class DistrictService {
  getAllDistricts() {
    return axios.get(url);
  }
}
