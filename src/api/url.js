import axios from './axios';

export default {
  login (params) {
    return axios.post('/login', params);
  },
  //用户退出
  logout (params) {
    return axios.post('/logout', params);
  },

  getTodoCount() {
    return axios.get('/survey/qnaire/count');
  },

  getPublishList(params) {
    return axios.get('/survey/qnaire/list/mobile', params)
  },

  getAnswerList(params) {
    return axios.post('/survey/qnaire/list', params)
  },

  getUserAnswerList(params) {
    return axios.post('/survey/answer/list', params)
  },

  recyclePaper(id) {
    return axios.get('/survey/qnaire/' + id + '/recovery')
  },

  stopPaper(params, id) {
    return axios.post('/survey/qnaire/'+ id +'/enable', params)
  },

  changeTime(params, id) {
    return axios.post('/survey/qnaire/'+ id +'/delay', params)
  },

  getPaperSummary(params) {
    return axios.postJson('/survey/stat/answer/view', params)
  },

  getAnswerDetail(params) {
    return axios.postJson('/survey/stat/answerdetail', params)
  }
};
