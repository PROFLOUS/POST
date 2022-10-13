const redis = require('redis');
const util = require('util');
require('dotenv').config()

const runApp = async ()=> {
    const client = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
        password: process.env.REDIS_PASSWORD
    });

    await client.connect();
    
    const setAsync = util.promisify(client.set).bind(client);
    const getAsync = util.promisify(client.get).bind(client);

    await setAsync('va', 'e');
    await client.quit();

}

runApp();
