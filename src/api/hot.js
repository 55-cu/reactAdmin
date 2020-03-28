import axios from '../utils/axios.js'

class HotApi{
  getData(payload){
    let url = '/chick/admin/hot/infopage'
    return axios.post(url,payload)
  }
  delTopic(payload){
    let url = '/chick/admin/hot/del'
    return axios.post(url,payload)
  }
  updateTopic(payload){
    let url = '/chick/admin/hot/update'
    return axios.post(url,payload)
  }
  addTopic(payload){
    let url = '/chick/admin/hot/add'
    console.log(payload)
    return axios.post(url,payload)
  }
}

export default new HotApi()