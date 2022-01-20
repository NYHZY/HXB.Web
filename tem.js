return function (grid) {
  let _data = grid.getSelectedRows();
  if (_data.length) {
      _data.forEach(item => {
          if (!common.isEmpty(item.id)) {
            this.$Http.get("page/page-field", {pageid:item.id}).then(res=>{
              if(res.statusCode==200){
                this.$message({
                  message: '【' + item.id + '】字段获取成功！',
                  type: 'success'
              });
              }else {
                this.$message.error(res.message);
              }
            }).catch(err => {
              this.$message.error(err);
          });
          }

      })
  }
}