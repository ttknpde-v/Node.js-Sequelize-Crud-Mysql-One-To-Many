const serviceRest = require('../service/ServiceRest') ,
    controllerRouter = require('../controller/controller-rest')
const ServiceRest = new serviceRest()
class TestMyBusiness {
    #application
    constructor() {
        console.log('TestMyBusiness\'s construct is working')
        this.#application = ServiceRest.express()
        this.#application.listen(3000 ,  (errors) => {
            if (!errors) {
                console.log('You are in port 3000')
            }
            else {
                console.log(errors.message)
                throw errors
            }})
    }
    testMyBusiness = () => {
        this.#application.use('/api-student',controllerRouter.routerStudent)
        this.#application.use('/api-location', controllerRouter.routerLocation)
    }
}

const testMyBusiness = new TestMyBusiness()

testMyBusiness.testMyBusiness()