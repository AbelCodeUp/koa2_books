const axios = require('axios');
const qs = require('qs');

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.data = qs.stringify(config.data);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

const bascURL = 'http://127.0.0.1/basic/web/index.php';
const book = {
    getBookInfo: async (id=1) => {
        let result;
        await axios.get(bascURL, {
                params: {
                    r: 'book/detail',
                    id
                }
            })
            .then(res => {
                let {
                    data
                } = res;
                if (data.code == 200) {
                    result = data.message;
                }

            })
        return result;
    },
    getBookList: async () => {
        let result;
        await axios.get(bascURL, {
                params: {
                    r: 'book/index'
                }
            })
            .then(res => {
                let {
                    data
                } = res;
                if (data.code == 200) {
                    result = data.message;
                    
                }

            })
        return result;
    },
    createBook: async ({
        name,
        author,
        number
    }) => {
        let result;
        await axios.post(`${bascURL}?r=book/insert`, {
                name,
                author,
                number
            })
            .then(res => {
                let {
                    data
                } = res;
                result = data;
            })
        return result;
    },
    updateBook: async ({
        name,
        author,
        number,
        id
    }) => {
        let result;
        await axios.post(`${bascURL}?r=book/update`, {
                name,
                author,
                number,
                id
            })
            .then(res => {
                let {
                    data
                } = res;
                result = data;
            })
        return result;
    },
    deleteBook: async({
        id
    }) => {
        
        let result;
        await axios.post(`${bascURL}?r=book/delete`, {
                id
            })
            .then(res => {
                let {
                    data
                } = res;
                result = data;
            })
        return result;
    }
}
module.exports = book;