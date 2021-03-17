/** @format */

import axios from "axios";
import Vue from "vue";

const config = {
  timeout: 600 * 1000
};
export const _axios = axios.create(config);

_axios.interceptors.request.use(
  cfg => {
    cfg.headers["Authorization"] =
      "Bearer " + sessionStorage.getItem("Authorization");
    if (cfg.method === "get" && cfg.params && cfg.params.fromTodo) {
      cfg.headers["From-Todo"] = true;
      delete cfg.params.fromTodo;
    } else if (cfg.method === "post" && cfg.data && cfg.data.fromTodo) {
      cfg.headers["From-Todo"] = true;
      delete cfg.data.fromTodo;
    } else if (
      cfg.method === "post" &&
      cfg.data &&
      (cfg.data["pm-formTODO"] === "true" ||
        cfg.data["pm-formTODO"] === "false")
    ) {
      if (cfg.data["pm-formTODO"] === "true") {
        cfg.data = cfg.data.params;
        cfg.headers["From-Todo"] = true;
      } else {
        cfg.data = cfg.data.params;
      }
    }
    return cfg;
  },
  err => {
    return Promise.reject(err);
  }
);
_axios.interceptors.response.use(
  res => {
    const { data } = res;
    if (res.status === 200) {
      const cacheConfig = res.config.headers.cacheConfig;
      if (cacheConfig && cacheConfig.cache) {
        const key: string = res.config.url || "";
        const resdata: string = res.data.data;
        localStorage.setItem(key, JSON.stringify(resdata));
      }
      return data;
    }
  },
  err => {
    let status = 0;
    let msg = "";
    if (err.response) {
      status = err.response.status;
      msg = err.response.data.message ? err.response.data.message : err;
    }
    if (status === 401) {
      sessionStorage.clear();
      console.log("登录过期，请重新登录！");
      setTimeout(() => {
        document.location.href = "/login";
      }, 2000);
      return Promise.reject(err);
    } else {
      msg && console.log(msg);
      return Promise.reject(err);
    }
  }
);
_axios.get = (url, params = {}, cfg?) => {
  const config = {
    method: "get",
    url,
    params: params,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache"
    },
    ...cfg
  };
  return _axios(config).catch(error => {
    return Promise.reject(error);
  });
};
