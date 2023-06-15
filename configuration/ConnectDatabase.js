const {Sequelize} = require('sequelize');
class ConnectDatabase {

    #sequelize
    #infodatabase = {
        host : "127.0.0.1" ,
        username : "***" ,
        password : "***" ,
        port : "***" ,
        database : "university" ,
        max:5 ,
        min:0 ,
        acquire:30000,
        idle:10000
    }
    constructor() {
        console.log('ConnectDatabase\'s construct is working')
        this.#sequelizeInfo = this.#infodatabase
    }
    set #sequelizeInfo (info) {
        this.#sequelize = new Sequelize(
            info.database ,
            info.username ,
            info.password ,
            {
                dialect:'mysql' ,
                pool : {
                    max: info.max ,
                    min: info.min ,
                    acquire: info.acquire,
                    idle: info.idle
                }
            }
        ) // new Sequelize
    }
    get sequelize () {
        return this.#sequelize
    }
}

/*
new ConnectDatabase().sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
*/

const connectWithSequelize = new ConnectDatabase()
module.exports = connectWithSequelize.sequelize
