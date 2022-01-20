
let _this = this;
var common = {
    askey: "BBF4EA0E7A0EBD7C60CCE2024E218A53BBB69CCA65B4D0B705E37080676E5F5D", //16
    asiv: "8E5EC1AC2191167DF9B753BA93A1E7B8",

    //解密方法调用
    getRouteParmter() {
        if (appHome.urldecode) {
            let prefix = this.aesDecrypt(_this.app.$route.query.prefix);
            return JSON.parse(prefix) || {};
        } else {
            return _this.app.$route.query || {};
        }
    },
    request(pmsname) {
        let _pms = common.getRouteParmter();
        let _c = Object.keys(_pms).filter((p) => {
            if (p.toLowerCase() == pmsname.toLowerCase()) {
                return p;
            }
        });
        if (_c.length != 0) {
            return _pms[_c[0]];
        } else {
            return "";
        }
    },
    pmsExist(pmsname) {
        let _pms = common.getRouteParmter();
        let _c = Object.keys(_pms).filter((p) => {
            if (p.toLowerCase() == pmsname.toLowerCase()) {
                return p;
            }
        });
        return _c.length >= 1;
    },
    pushState(_obj) {
        let _pms = common.getRouteParmter();
        let _pmsobj = Object.keys(_obj);
        for (const _objIdx in _pmsobj) {
            let _c = Object.keys(_pms).filter((p) => {
                if (p.toLowerCase() == _pmsobj[_objIdx].toLowerCase()) {
                    return p;
                }
            });
            if (_c.length != 0) {
                _pms[_c[0]] = _obj[_pmsobj[_objIdx]];
            } else {
                _pms[_pmsobj[_objIdx]] = _obj[_pmsobj[_objIdx]];
            }
        }
        let urlpms = "";
        if (appHome.urldecode) {
            urlpms = "prefix=" + common.aesEncrypt(JSON.stringify(_pms));
        } else {
            let _newpms = [];
            let _newobj = Object.keys(_pms);
            for (const key in _newobj) {
                _newpms.push(_newobj[key] + "=" + _pms[_newobj[key]]);
            }
            urlpms = _newpms.join("&");
        }
        if (window.location.href.indexOf("?") == -1) {
            window.history.pushState({}, "", window.location.href + "?" + urlpms);
        } else {
            window.history.pushState(
                {},
                "",
                window.location.href.substring(
                    0,
                    window.location.href.indexOf("?") + 1
                ) + urlpms
            );
        }
    },
    aesEncrypt(word) {
        if (!word) return "";
        let key = CryptoJS.enc.Utf8.parse(this.askey),
            iv = CryptoJS.enc.Utf8.parse(this.asiv),
            srcs = CryptoJS.enc.Utf8.parse(word),
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
        return encrypted.ciphertext.toString();
    },
    aesDecrypt(word) {
        if (!word) return "{}";
        let key = CryptoJS.enc.Utf8.parse(this.askey),
            iv = CryptoJS.enc.Utf8.parse(this.asiv),
            encryptedHexStr = CryptoJS.enc.Hex.parse(word),
            srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr),
            decrypt = CryptoJS.AES.decrypt(srcs, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }),
            decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },
    /**end*/
    isBoolVal(v) {
        if (common.isEmpty(v)) return false;
        var val = v.toString();
        var c = val.toLowerCase().substr(0, 1);
        if (c == "y" || c == "t") return true;
        if (c == "f" || c == "n") return false;
        if (common.isNumber(c)) {
            var n = new Number(c);
            return n != 0;
        }
        return false;
    },
    isEmpty(v) {
        if (v == null) return true;
        if (typeof v == "undefined") return true;
        if (v.constructor == Array) return v.length == 0;
        if (typeof v == "string") return v.length == 0;
        if (typeof v == "object") return JSON.stringify(v) == "{}";
        if (v.constructor == Number && isNaN(v)) return true;
        //if ((v instanceof ) && v.hasOwnProperty('length') && v.length == 0) return true;
        return false;
    },
    isNumber(v) {
        //是否为数字
        if (common.isEmpty(v)) return false; //为空，返回false
        if (common.isInteger(v)) return true; //是整数
        var reg = /^[+-]?\d*\.\d+$/g;
        return reg.test(v);
    },
    isInteger(v) {
        //是否为整数
        if (common.isEmpty(v)) return false; //为空，返回false
        var reg = /^[+-]?\d+$/g;
        return reg.test(v);
    },
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
    },
    getStrObjSync(v) {
        try {
            let _obj = null;
            try {
                var patt = new RegExp(/^(\s*return\s*{|\s*return)/);
                if (patt.test(v)) {
                    _obj = new Function(v)();
                } else {
                    _obj = new Function("'use strict';  return " + v)();
                }
            } catch (e) {
                console.log(v);
            }
            return _obj;
        } catch (e) {
            console.log(v);
            alert("转换失败" + v);
        }
    },
    selectArray(a, fn, selector) {
        //对数组进行选择

        var result = [];
        if (common.isEmpty(a)) return result;
        if (a.constructor != Array) return result;

        for (var i = 0; i < a.length; i++) {
            if (fn(a[i])) {
                if (isEmpty(selector) || selector.constructor != Function) {
                    result.push(a[i]);
                } else {
                    var item = selector(a[i]);
                    result.push(item);
                }
            }
        }
        return result;
    },
    selectFirst(a, fn, selector) {
        //对数组进行选择

        var result = [];
        if (a.constructor != Array) return result;

        for (var i = 0; i < a.length; i++) {
            if (fn(a[i])) {
                if (isEmpty(selector) || selector.constructor != Function) {
                    result.push(a[i]);
                } else {
                    var item = selector(a[i]);
                    result.push(item);
                }
                break;
            }
        }
        return result.length > 0 ? result[0] : null;
    },
    openDialog(_pms, _title, _tpl, _callback, _methods) {
        let _data = Object.assign(
            {
                dialogTableVisible: true,
                width: "95%",
                height: "95%",
            },
            _pms
        );
        let _window = Vue.extend({
            data() {
                return _data;
            },
            template: ` <transition name="transition-box">
                    <el-dialog @close="windclosed()"  :close-on-click-modal="false" ref="openWind" fullscreen title="${_title}" class="auto_dialog"   :append-to-body="true"  :visible.sync="dialogTableVisible">
                      ${_tpl}
                    </el-dialog>
                 </transition>`,
            mounted() {
                _pms.dialog = this;
                let wd = this.$refs.openWind.$el.querySelector("[role=dialog");
                wd.style.width = this.width;
                wd.style.height = this.height;
            },
            methods: {
                ..._methods,
                windclosed() {
                    let me = this;
                    if (typeof _callback == "function") {
                        _callback.call(me, _pms);
                    }
                    this.$destroy();
                },
            },
        });
        new _window().$mount();
    },
    objectAssign(_oldobj, _newobj) {
        let exist = function (_obj, _key) {
            let _o = { exist: false, key: "" };
            Object.keys(_obj).forEach((item) => {
                if (item.toLowerCase() == _key.toLowerCase()) {
                    _o.exist = true;
                    _o.key = item;
                }
            });
            return _o;
        };
        if (typeof _newobj == "object") {
            Object.keys(_newobj).forEach((item) => {
                let _o = exist(_oldobj, item);
                if (_o.exist) {
                    _oldobj[_o.key] = _newobj[item];
                } else {
                    _oldobj[item] = _newobj[item];
                }
            });
        }
        return _oldobj;
    },
    //pdf页面调用
    pdfPreview(pdf) {
        window.open("./static/js/pdf/web/viewer.html?file=" + pdf, "PDF");
    },
    // 图片转Blob对象生成url
    convertBase64ToBlob(base64) {
        var base64Arr = base64.split(",");
        var imgtype = "";
        var base64String = "";
        if (base64Arr.length > 1) {
            //如果是图片base64，去掉头信息
            base64String = base64Arr[1];
            imgtype = base64Arr[0].substring(
                base64Arr[0].indexOf(":") + 1,
                base64Arr[0].indexOf(";")
            );
        }
        // 将base64解码
        var bytes = atob(base64String);
        //var bytes = base64;
        var bytesCode = new ArrayBuffer(bytes.length);
        // 转换为类型化数组
        var byteArray = new Uint8Array(bytesCode);
        // 将base64转换为ascii码
        for (var i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i);
        }
        console.log(new Blob([bytesCode], { type: imgtype }));
        // 生成Blob对象（文件对象）
        return window.URL.createObjectURL(
            new Blob([bytesCode], {
                type: imgtype,
            })
        );
    },
};
