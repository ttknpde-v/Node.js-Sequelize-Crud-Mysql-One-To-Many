const {DataTypes} = require('sequelize')
const sequelize = require('../configuration/ConnectDatabase')

const Location = sequelize.define(
    "locations"  , { // name of table
        province : {
            type : DataTypes.STRING ,
            allowNull: false
        } ,
        district : {
            type : DataTypes.STRING,
            allowNull : false
        } ,
        zipcode : {
            type : DataTypes.STRING,
            allowNull : false
        }
        ,
        phone : {
            type:DataTypes.STRING ,
            allowNull: false,
            primaryKey: true
        }
        ,
        key_student_id : {
            type : DataTypes.INTEGER ,
            references: { // setting details foreign key field
                model: 'students', // map this field to table
                key: 'student_id' // reference of this field
            }
        }
    }
    ,
    {
        // disable create these fields
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Location
