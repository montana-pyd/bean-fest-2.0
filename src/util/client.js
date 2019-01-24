import request from 'superagent'
import {
  API_URL
} from './../env';

class Client {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
    this.token = null;
    let token = localStorage.getItem("BEANFEST_TOKEN");
    if (token) {
      this.token = token;
    }
  }
  // Internal
  _getUrl(slug) {
    return `${this.baseUrl}${slug}`;
  }
  _defaultHeaders() {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    if (this.token) {
      headers.token = this.token;
    }
    return headers;
  }
  _setToken(token) {
    localStorage.setItem("BEANFEST_TOKEN", token);
    this.token = token;
  }
  _handleError(error) {
    console.error(error);
    throw error;
  }
  _handleHTTPError(error) {
    console.log(error);
    let msg;
    try {
      msg = JSON.parse(error.response.text);
    } catch (e) {
      msg = error.response.text;
    }
    throw msg;
  }
  // Requests
  get(slug = "", query = {}, headers = {}) {
    return request
      .get(this._getUrl(slug))
      .query(query)
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .catch(this._handleHTTPError);
  }
  post(slug = "", data = {}, headers = {}) {
    return request
      .post(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  put(slug = "", data = {}, headers = {}) {
    return request
      .put(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  delete(slug = "", data = {}, headers = {}) {
    return request
      .delete(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  // Authentication
  register(firstName = "", lastName = "", email = "", password = "") {
    return this.post("/researcher/register", {
      firstName,
      lastName,
      email,
      password
    })
      .then(res => {
        this._setToken(res.body.token);
        return res;
      })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  login(email = "", password = "") {
    return this.post("/researcher/login", {
      email,
      password
    })
      .then(res => {
        this._setToken(res.body.token);
        return res;
      })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  // Study Routes
  createStudy(name) {
    return this.post("/study/create", {
      name
    })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  listStudies(){
    return this.get('/study/list')
      .then(res => {
        console.log("called client");
        return res.body;
      })
      .catch(this._handleError);
  }
  // Trial Routes
  startTrial(participantId, studyId) {
    return this.post("/trial/start", {
      participantId,
      studyId,
    })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  updateTrial(participantId, studyId, response) {
    return this.post("/trial/update", {
      participantId,
      studyId,
      response,
    })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
}


export default new Client(API_URL);
