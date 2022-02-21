import request from 'request'
import config from '../config/index.js'

export default function getAllKurs(){
    return new Promise((resolve,reject)=>{
        request(config.apiURl,(err,res,body)=>{
            if(res.statusCode == 200 && !err){
                resolve(body)
            }
            else reject()
        })
    })
}