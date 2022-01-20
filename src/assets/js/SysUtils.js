const Utils={
  getStrObj(v) {
    return new Promise((resolve, reject) => {
        try {
            let _obj = null;
            try {
                var patt = new RegExp(/^(\s*return\s*{|\s*return)/);
                if (patt.test(v)) {
                    _obj = new Function(v)();
                } else {
                    _obj = new Function("return " + v)();
                }
            } catch (e) {
                console.log(v);
            }
            resolve(_obj);
        } catch (e) {
            console.log(v);
            reject("转换失败");
        }
    });
  }
}
//导出
export default Utils