// file for create model to use sequelize query
const {DataTypes} = require('sequelize')
const sequelize = require('../configuration/ConnectDatabase')

const Student = sequelize.define(
    "students"  , { // name of table
        student_id : {
            type : DataTypes.INTEGER ,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        } ,
        student_fullname : {
            type : DataTypes.STRING,
            allowNull: false
        } ,
        student_weight : {
            type : DataTypes.FLOAT,
            allowNull: false
        }
        ,
        student_height : {
            type : DataTypes.DECIMAL,
            allowNull: false
        }
        ,
        student_grade : {
            type : DataTypes.INTEGER,
            allowNull: false
        }
        ,
        currentdatetime : {
            type : DataTypes.STRING ,
            allowNull: false
        }
    }
    ,
    {
        // disable create these fields
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Student
