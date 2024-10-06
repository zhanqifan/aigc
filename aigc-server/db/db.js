const { Sequelize } = require('sequelize');
const {dbConfig}= require('@/config/default')
const logger = require('@/loggerMiddleware'); // 引入日志中间件
const db =new Sequelize(dbConfig.database,dbConfig.userName,dbConfig.password,{
    host:dbConfig.host,//主机地址
    dialect:dbConfig.dialect,// 指定数据库类型 'mysql', 'mariadb', 'postgres', 'mssql', 'sqlite', 'snowflake', 'db2' or 'ibmi'
    port:dbConfig.port,
    define:{
        freezeTableName:true,//是否自动将表名复数 true:禁止
        timestamps: false // 是否自动添加时间戳字段
    },
    logging:false,// 日志输出
    sync:{
        force:false// 不会强制删除现有表并且重新创建
    }, 

    
})
// 使用 authenticate() 方法测试数据库连接
db.authenticate()
.then(() => {
    logger.info('数据库连接成功');
})
.catch(err => {
    logger.error(`数据库连接失败: ${err.message}`);
});
// 同步模型
db.sync().then(() => {
    logger.info('数据库同步成功');
})
.catch(err => {
    logger.error(`数据库同步失败: ${err.message}`);
});


module.exports=db