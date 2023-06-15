// roles of this page , it's controller api
const serviceCrude = require('../service/ServiceCrud')
const serviceRest = require('../service/ServiceRest')

const Student = require('../models/student')
const Location = require('../models/location')

const ServiceRest = new serviceRest()
const ServiceCrud = new serviceCrude()

let bodyParser = ServiceRest.bodyParser
let routerStudent = ServiceRest.express.Router()
let routerLocation = ServiceRest.express.Router()

routerStudent.use(bodyParser.json())
routerStudent.use(bodyParser.urlencoded({extended : true}))

routerLocation.use(bodyParser.json())
routerLocation.use(bodyParser.urlencoded({extended : true}))

const dateObject = new Date(),
    date = (`0${dateObject.getDate()}`).slice(-2),
    month = (`0${dateObject.getMonth() + 1}`).slice(-2),
    year = dateObject.getFullYear(),
    hours = dateObject.getHours(),
    minutes = dateObject.getMinutes(),
    seconds = dateObject.getSeconds();

routerStudent.post('/create' , async (req , res) => {
    try {
        let {student_fullname, student_weight, student_height, student_grade} = req.body
        let currentdatetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        let locations = req.body.locations
        /*
            this is result locations it stores on below
                {
                    province: 'Bangkok',
                    district: 'Bang Na',
                    zipcode: 10150,
                    phone: '0623212221'
                }
        */
        await ServiceCrud.createTwoTables(student_fullname, student_weight, student_height, student_grade,currentdatetime , locations).then(
            (result) => {
                return res.status(201).json({
                    status: "created" ,
                    data : result
                })
            }).catch((errors) => { throw errors })

        } catch (errors) {
            console.log(`course : ${errors.message}`)
            throw errors
    }
})


routerStudent.get('/reads' , async (req , res) => {
        try {
            await ServiceCrud.readsTwoTables().then(
                (result) => {
                    return res.status(202).json({
                        status:"accepted",
                        data : result
                    })
                }).catch((errors) => { throw errors })

        } catch (errors) {
            console.log(`course : ${errors.message}`)
            throw errors
        }
})

routerStudent.get('/read/(:student_id)' , async (req , res) => {
    try {
        let student_id = req.params["student_id"]
        await ServiceCrud.readTwoTablesById(student_id).then(
            (result) => {
                return res.status(202).json({
                    status:"accepted",
                    data : result
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerStudent.put('/update/(:student_id)', async (req , res) => {
    try {
        let student_id = req.params["student_id"]
        let {student_fullname, student_weight, student_height, student_grade} = req.body
        let currentdatetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        await ServiceCrud.updateStudent(student_fullname, student_weight, student_height, student_grade,currentdatetime,student_id).then(
            () => {
                return res.status(200).json({
                    status:"ok",
                    message : "updated success"
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerStudent.delete('/delete/(:student_id)' , async (req , res) => {
    try {
        let student_id = req.params["student_id"]
        await ServiceCrud.deleteStudent(student_id).then(
            () => {
                return res.status(200).json({
                    status:"ok",
                    message : "deleted success"
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})
// end router of student


routerLocation.post('/(:student_id)/create' , async (req , res) => {
    try {
        let key_student_id = req.params["student_id"]
        let {province,district,zipcode,phone} = req.body
        await ServiceCrud.createLocationByIdStudent(province,district,zipcode,phone,key_student_id).then(
            (result) => {
                return res.status(201).json({
                    status:"created",
                    message : "created success" ,
                    data : result
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerLocation.get('/reads' , async (req , res) => {
    try {
        await ServiceCrud.readsLocation().then(
            (result) => {
                return res.status(202).json({
                    status:"accepted",
                    data : result
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerLocation.get('/read/(:phone)' , async (req , res) => {
    try {
        let phone = req.params["phone"]
        await ServiceCrud.readLocation(phone).then(
            (result) => {
                return res.status(202).json({
                    status:"accepted",
                    data : result
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerLocation.delete('/deletes/(:student_id)' , async (req , res) => {
    try {
        let key_student_id = req.params["student_id"]
        await ServiceCrud.deletesLocation(key_student_id).then(
            () => {
                return res.status(200).json({
                    status:"ok",
                    message : "deleted success"
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerLocation.delete('/delete/(:phone)' , async (req , res) => {
    try {
        let phone = req.params["phone"]
        await ServiceCrud.deleteLocation(phone).then(
            () => {
                return res.status(200).json({
                    status:"ok",
                    message : "deleted success"
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

routerLocation.put('/(:student_id)/update' , async (req , res) => {
    try {
        let key_student_id = req.params["student_id"]
        let {province,district,zipcode,phone} = req.body
        await ServiceCrud.updateLocation(province,district,zipcode,phone,key_student_id).then(
            () => {
                return res.status(202).json({
                    status:"accepted",
                    message : "updated success"
                })
            }).catch((errors) => { throw errors })

    } catch (errors) {
        console.log(`course : ${errors.message}`)
        throw errors
    }
})

module.exports = {
    routerStudent ,
    routerLocation
}