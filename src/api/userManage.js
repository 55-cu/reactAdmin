import axios from '../utils/axios'
class UserManage {
    userDel(_id){
        let url= '/chick/admin/user/del'
        return axios.post(url,_id)
    }
    userQuery(payload){
        let url = '/chick/admin/user/infopage'
        return axios.post(url,payload)
    }
    // UserAdd(payload){
    //     let url= '/chick/admin/user/reg'
    //     return axios.post(url,payload)
    // }
}

export default new UserManage()