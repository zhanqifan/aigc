const { Sequelize } = require('sequelize');
const {dbConfig}= require('@/config/default')

const db =new Sequelize(dbConfig.database,dbConfig.userName,dbConfig.password,{
    host:dbConfig.host,//主机地址
    dialect:dbConfig.dialect,// 指定数据库类型 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
    port:dbConfig.port,
    define:{
        freezeTableName:true,//是否自动将表名复数 true:禁止
    },
    logging:false,// 日志输出
    sync:{
        force:false// 不会强制删除现有表并且重新创建
    } 
})
db.sync()//如果表不存在就会自动创建(如果已经存在,不执行任何操作)

module.exports=db