import apiSetts from "../../system/Setts/Api.js";
class Req {
  constructor(setts) {
    this.api_key = setts.API_KEY;
    this.base_url = "https://api.themoviedb.org/4/";
    this.image_url = "https://image.tmdb.org/t/p/w185";
    this.request_token = setts.REQUEST_TOKEN;

    this.config_url = setts.CONFIG_URL;
    this.search_url = setts.SEARCH_URL;

    this.builded_url = this.base_url;
  }

  getListFromSearch(value, stateFn, page = 1) {
    return async () => {
      const url = `${this.search_url}${this.api_key}&page=${page}&language=en&query=${value}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.results.length > 0) {
          stateFn(data.results, value);
        }
      } catch (e) {
        console.log("getListFromSearch error", e);
      }
    };
  }

  getListByPopularity(stateFn, page) {
    return async () => {
      try {
        const res = await fetch(
          `${this.base_url}discover/movie?sort_by=popularity.desc&page=${page}&language=en`,
          {
            headers: {
              Authorization: `Bearer ${this.request_token}`,
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        const data = await res.json();

        if (data.results.length > 0) {
          stateFn(data.results);
        }
      } catch (e) {
        console.log("getListByPopularity error", e);
      }
    };
  }
  getListByRating(stateFn, page) {
    return async () => {
      try {
        const res = await fetch(
          `${this.base_url}discover/movie?&vote_average.gte=8&page=${page}&language=en`,
          {
            headers: {
              Authorization: `Bearer ${this.request_token}`,
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        );
        const data = await res.json();

        if (data.results.length > 0) {
          stateFn(data.results);
        }
      } catch (e) {
        console.log("getListByRating error", e);
      }
    };
  }
}
export default new Req(apiSetts);
