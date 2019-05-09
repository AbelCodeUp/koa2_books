const fetch = require('node-fetch');
const config = require('../config');
const qs = require('qs');

class SafeRequest {
    constructor(url) {
        this.url = url;
        this.baseURL = config.baseURL;

        this.requestURL = this.baseURL + this.url;
    }
    fetch(options) {

        let koaFetch;
        if (options) {
            let {
                method,
                params
            } = options;
            if( method == 'GET' ){
                console.log(`${this.requestURL}&${qs.stringify(params)}`);
                
                koaFetch = fetch( `${this.requestURL}&${qs.stringify(params)}`, {
                    method: method
                })
            }else{
                koaFetch = fetch(this.requestURL, {
                    method: method,
                    body: params
                })
            }
            
            
        } else {
            koaFetch = fetch(this.requestURL)
        }

        return new Promise((resolve, reject) => {
            let result = {
                code: 0,
                message: '',
                data: []
            };
            koaFetch
                .then(res => {

                    let _json = {};
                    try {
                        _json = res.json();
                    } catch (error) {
                        // 处理错误
                    }
                    return _json;
                })
                .then(json => {
                    result.data = json;
                    resolve(result);
                }).catch(error => {
                    result.code = 1;
                    result.message = '通讯异常';
                    reject(result);
                })
        })
    }
}

module.exports = SafeRequest;