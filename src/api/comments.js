import axios from '../utils/axios'
class Comments {
  findSecondList(payload){
    let url='/chick/admin/discuss/infoSecond'
    return axios.post(url,payload)
  }
  delSecond(payload){
    let url='/chick/admin/discuss/delsecondry'
    return axios.post(url,payload)
  }
  //添加
  addSecond(payload){
    let url='/chick/admin/discuss/addSecond'
    return axios.post(url,payload)
  }
  //编辑
  updateSecond(payload){
    let url='/chick/admin/discuss/updateSecond'
    return axios.post(url,payload)
  }
  //根据id获取数据
  getData(payload){
    let url='/chick/admin/discuss/getSecond'
    return axios.post(url,payload)
  }
}

export default  new Comments()