import { extend } from 'lodash';
import { join } from'path';

let config = {
    viewDir : join(__dirname, '..', 'views'),
    staticDir: join(__dirname, '..', 'public'),
};

if(false){
    console.log('111111');
    
}

if( process.env.NODE_ENV == 'development' ){
    const localConfig = {
        port: 3000,
        baseURL: 'http://127.0.0.1/basic/web/index.php?r='
    }
    config = extend(config, localConfig);
}
if( process.env.NODE_ENV == 'production' ){
    const localConfig = {
        port: 80,
    }
    config = extend(config, localConfig);
}

module.exports = config;

