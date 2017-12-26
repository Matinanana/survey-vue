<template lang="html">
  <div>
    <div class="buttons" :class="{'fixed-bottom': isFixedBottom}">
      <div class="stop-answer btn" @click.stop.prevent="toggleStop(item)">
        <i class="iconf" :class="item.disabled ? 'i-play':'i-stop'"></i>
        <span v-if="!item.disabled">停止作答</span>
        <span v-else class="editing">开始作答</span>
      </div>
      <div class="delete-paper btn" @click.stop.prevent="recyclePaper(item.id)">
        <i class="iconf i-delete"></i> 回收问卷
      </div>
      <div class="change-time btn" :class="{'editing': item.editing}" @click.stop.prevent="changeTime(item)">
      <i class="iconf i-modify" :class="{'editing': item.editing}"></i> 修改时间
      </div>
    </div>
    <mt-datetime-picker v-if="isFixedBottom" ref="picker" type="datetime" v-model="datetime" :start-date="now" @confirm="confirmDatetime"></mt-datetime-picker>
  </div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui'
import api from 'api/url'
import util from 'utils/index'

export default {
  props: {
    item: {
      type: Object,
      default: null,
      require: true
    },
    callback: {
      type: Function
    },
    isFixedBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      datetime: null,
      now: new Date()
    }
  },
  methods: {
    toggleStop(item) {
      let message = item.disabled ? '确定开始作答该问卷吗' : '确定停止作答该问卷吗';
      MessageBox.confirm(message).then(() => {
        api.stopPaper({
          disabled: !item.disabled
        }, item.id).then((data) => {
          if (data.resultCode === 'SUCCESS') {
            this.callback();
          }
        })
      }).catch((err) => {
        // MessageBox.alert(err.message)
      });
    },
    recyclePaper(id) {
      MessageBox.confirm("确定回收该问卷吗").then(action => {
        api.recyclePaper(id).then((data) => {
          if (data.resultCode === 'SUCCESS') {
            if (this.isFixedBottom) {
              this.$router.back();
            } else {
              this.callback();
            }
          }
        }).catch((err) => {
          // MessageBox.alert(err.message)
        })
      })
    },
    changeTime(item) {
      if (this.isFixedBottom) {
        item.editing = true;
        this.selectedItem = item;
        // this.datetime = util.formateStrToDate(this.selectedItem.startDate)
        this.$refs.picker.open();
      } else {
        this.$emit('time-changed', item)
      }
    },
    confirmDatetime(data) {
      this.selectedItem.editing = false;
      api.changeTime({
        endDate: util.formateDateToStr(data)
      }, this.selectedItem.id).then((res) => {
        if (res.resultCode === 'SUCCESS') {
          this.callback();
        }
      }).catch((err) => {
        MessageBox.alert(err.message)
      })
    },

  },
  components: {
    MessageBox
  }
}
</script>

<style lang="css">
.btn {
  width: 32%;
  padding: 0.6rem 0;
  text-align: center;
  display: inline-block;
  color: #999;
}
.buttons {
  border-top: 1px solid #e5e5e5;
  padding: 0.3rem 0;
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
}
.buttons img{
    width: 0.4rem;
    height: 0.5rem;
}
.stop-answer, .delete-paper {
  border-right: 1px solid #e5e5e5;
}
.editing {
  color: #64aad5;
}
</style>
