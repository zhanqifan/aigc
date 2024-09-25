// 统一接口响应数据格式
// data 返回响应体
// code 状态码
// msg 消息
// error //错误说明
// serviceCode //业务错误码

const responseHanlder = async(ctx,next)=>{
    ctx.send=({data=null,code=200,msg='success',error=null})=>{
        ctx.body={
            data,
            code,
            msg,
        }
            // 仅在 error 不为 null 时添加 error 字段
            if (error !== null) {
                ctx.body.error = error;
            }
    
        ctx.status=code
    }
    await next()
}
module.exports =responseHanlder