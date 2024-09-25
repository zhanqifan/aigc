class Validate{
    // 校验undefined 未传该字段
    async undeinedCheck (val,par){
     if(val===undefined){
        throw{msg:`${par}字段必填`,code:400}
     }
    }
    // 空值和字符串校验  值 错误提示 校验类型
    async nullCheck(val,tips,par){
     await  this.undeinedCheck(val,par)
          // 检查 val 的类型
   if (typeof val !== 'string') {
    throw { msg: `${par}字段必须是字符串`, code: 400 };
   }
      // 检查 val 是否为空
    else  if (val.trim() === "") {
        throw { msg: tips || '请填写姓名', code: 422 };
    }

  
    }
    async typeIsArray(val,tips,par){
        await  this.undeinedCheck(val,par)
        // 检查 val 的类型
   if (!Array.isArray(val)) {
  throw { msg: `${par}字段必须是数组类型`, code: 400 };
  }
    // 检查 val 是否为空
  else  if (val.length <=0) {
      throw { msg: tips || '数组不为空', code: 422 };
  }
    }
}

module.exports=new Validate()