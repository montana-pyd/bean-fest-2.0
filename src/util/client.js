import request from 'superagent'
import {
  API_URL
} from './../env';

class Client {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
    this.token = null;
  }
  // Internal
  _getUrl(slug) {
    return `${this.baseUrl}${slug}`;
  }
  _defaultHeaders() {
    let headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    if (this.token) {
      headers.token = this.token;
    }
    return headers;
  }
  _setToken(token) {
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
  get(slug = '', query = {}, headers = {}) {
    return request
      .get(this._getUrl(slug))
      .query(query)
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .catch(this._handleHTTPError);
  }
  post(slug = '', data = {}, headers = {}) {
    return request
      .post(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  put(slug = '', data = {}, headers = {}) {
    return request
      .put(this._getUrl(slug))
      .set({
        ...headers,
        ...this._defaultHeaders()
      })
      .send(data)
      .catch(this._handleHTTPError);
  }
  delete(slug = '', data = {}, headers = {}) {
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
  register(firstName = '', lastName = '', email = '', password = '') {
    return this.post('/researcher/login', {
      firstName,
      lastName,
      email,
      password,
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
  login(email = '', password = '') {
    return this.post('/researcher/login', {
      email,
      password,
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
  // Vote
  upVoteRoom(roomId) {
    return this.post('/room/up-vote', {
      roomId
    })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  downVoteRoom(roomId) {
    return this.post('/room/down-vote', {
      roomId
    })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  // Rooms
  createRoom(newRoom = {}) {
    return this.post('/room/new', newRoom)
      .then(res => res.body)
      .catch(this._handleError);
  }
  createPrivateRoom(newRoom = {}) {
    return this.post('/room/new/private', newRoom)
    .then(res => res.body)
    .catch(this._handleError);
  }
  listRooms(lat, lng) {
    console.log(lat, lng);
    return this.get('/room/list', {
      lat,
      lng
    })
      .then(res => {
        return res.body;
      })
      .catch(this._handleError);
  }
  listPrivateRooms(){
    return this.get('/room/list/private')
    .then(res => res.body)
    .catch(this._handleError);
  }
  // Messages
  listMessages(roomId) {
    return this.get(`/message/list/${roomId}`)
      .then(res => res.body)
      .catch(this._handleError);
  }
}


export default new Client(API_URL);
