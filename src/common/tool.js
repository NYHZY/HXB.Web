import Vue from 'vue'
const common ={
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
            this.$refs.openWind.$el.style.marginTop="20px"
            let wd = this.$refs.openWind.$el.querySelector(".el-dialog");
            wd.style.width = this.width;
            wd.style.height = this.height;
            wd.style.flexDirection="column";
            wd.style.display="flex";
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
  getStrObj(v) {
    return new Promise((resolve, reject) => {
        try {
            let _obj = null;
            var patt = new RegExp(/^(\s*return\s*{|\s*return)/);
            if (patt.test(v)) {
                _obj = new Function(v)();
            } else {
                _obj = new Function("return " + v)();
            }
            resolve(_obj);
        } catch (e) {
            console.log(v);
            reject("转换失败"+v);
        }
    });
  },
  getStrObjSync(v) {
      try {
          let _obj = null;
          var patt = new RegExp(/^(\s*return\s*{|\s*return)/);
          if (patt.test(v)) {
              _obj = new Function(v)();
          } else {
              _obj = new Function("'use strict';  return " + v)();
          }
          return _obj;
      } catch (e) {
          console.log(e);
          alert("转换失败" + v);
      }
  },
  rendertab(prams,cfgstr) {
    console.log(this.$Vue);
    let _cfgstr=this.getStrObjSync(cfgstr);
    const tabComponent = Vue.extend(_cfgstr);
    return new tabComponent({
      data: {
        pms: prams
      }
    }).$mount().$el;
  },
}

export default common;