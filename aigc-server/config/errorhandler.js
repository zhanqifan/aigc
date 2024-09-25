const logger =require('@/loggerMiddleware')
const errorHandler = async (ctx, next) => {
    try {
        await next();
      logger.info(`输出日志:${ctx.method}--${ctx.url}`)
    } catch (err) {
        logger.error(err)
    
        // 接受参数校验的错误
        if(err.code){
            const {code,data} =err
            console.log(err)
            ctx.body = {
                msg:'客户端错误',
                data:data||'异常错误',
                code:code || 500
            };
            ctx.status = code || 500;
            console.log('错误捕获-客户端错误',err.data)
        }else{
            console.log('错误捕获',err.message)
            ctx.body = {
                msg:'服务端错误',
                data:err.message||'异常错误',
                code: err.status || 500
            };
            ctx.status = err.status || 500;
        }
       
       
       
    }
};

module.exports=errorHandler