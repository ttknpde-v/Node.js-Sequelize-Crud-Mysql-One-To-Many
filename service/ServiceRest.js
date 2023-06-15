class ServiceRest {
    #express
    #bodyParser
    constructor() {
        console.log('ServiceRest\'s construct is working')
        this.#express = require('express')
        this.#bodyParser = require('body-parser')
    }
    get express() {
        return this.#express;
    }

    get bodyParser() {
        return this.#bodyParser;
    }
}

module.exports = ServiceRest