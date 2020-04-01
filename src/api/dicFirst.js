import axios from '../utils/axios'
class dicFirst {
    addFirst(payload){
        let url = "/chick/admin/discuss/add"
        return axios.post(url,payload)
    }
    delFirst(payload){
        let url = '/chick/admin/discuss/delPrimary'
        return axios.post(url,payload)
    }
    findFirst(payload){
        let url='/chick/admin/discuss/info'
        return axios.post(url,payload)
    }
}

export default new dicFirst()