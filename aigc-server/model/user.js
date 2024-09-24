const db =require("@/db/db")
const {DataTypes} =require("sequelize")
// 用户表
const dayjs= require("dayjs")
const User=  db.define("user-info",{
    //昵称        
    nickName:{
        type:DataTypes.STRING, //字段类型为string    
        allowNull:false//不允许为空
    },
    // 用户唯一标识
        openid:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true//是否为主键 保证唯一性 不能重复
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt: {
       type: DataTypes.STRING,
       allowNull:false,
       defaultValue: dayjs().format('YYYY-MM-DD HH:mm:ss')//默认生成时间
    },
    updatedAt: {
       type: DataTypes.STRING,
       allowNull:false,
       defaultValue: dayjs().format('YYYY-MM-DD HH:mm:ss')//默认更新时间
    }
})

module.exports = User;
