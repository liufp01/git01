<!--
* @Author:liufp
* @Date: 2022/04/01 13:30:13
* @LastEditors: 
* @LastEditTime: 2022/04/01 13:30:13
* @Description:详情页意见审批模块
-->
<template>
  <div>
    <div v-if="this.billType2 != 'partTask'" class="suggestion-container">
      <div class="baseInfo">
        <div class="flagColor"></div>
        <span class="name">意见</span>
      </div>
      <div v-if="this.billType2 == 'undoTask'" class="label">
        <span
          v-for="(item, index) in approveLabel"
          :key="index"
          v-bind:class="[selected == index ? 'selected' : '']"
          @click="changeLabel($event, item)"
          >{{ item.label }}</span
        >
      </div>
      <div v-if="this.billType2 == 'doneTask'" class="label">
        <span @click="setMsg()"> 弃审</span>
      </div>
      <div class="content">
        <van-field
          v-model="message"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入审批意见"
        />
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="footer">
      <div v-if="this.billType2=='undoTask'" class="btnAgree btnColor" @click="doAgree()">提交</div>
      <div v-if="this.billType2=='undoTask'" class="btnReject btnColor" @click="doReject()">驳回</div>
      <div v-if="this.billType2=='doneTask'" class="btnSend btnColor" @click="doWithdraw()">撤回</div>
      <div v-if="this.billType2=='partTask'" class="btnRecall btnColor" @click="doRecall()">收回</div>
    </div>

    <!-- 提交时显示Loading效果-->
    <div>
      <van-overlay :show="showLoading">
        <div class="loading-container">
          <van-loading size="24px" vertical>正在提交...</van-loading>
        </div>  
      </van-overlay>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Toast, Loading, Dialog, Overlay } from "vant";
Vue.use(Toast).use(Loading).use(Overlay).use(Dialog);
export default {
  name: "OpinionApproval",
  data(){
    return{
      // 输入的审批意见
      message: "同意",
      // 选择的审批意见-同意、不同意、已阅
      selected: 0,
      // 点击操作按钮显示Loading
      showLoading: false,
      approveLabel: [
        { id: 0, label: "同意" },
        { id: 1, label: "不同意" },
        { id: 2, label: "已阅" },
      ],
      // 驳回到发起人
      activityId: "markerbill",
      processType:"",
      recordId:"",//formId
      billType2:"",
      strMsg:"您填写的意见超长请重新填写!(应小于4000字符)",
    }
  },
  //声明接收组件传参
  props:['billType','taskId','processInstanceId','processDefinitionId','billId'],
  watch: {
      billType: function(newVal,oldVal){
          this.billType2 = newVal;  //newVal即是billType
          //newVal && this.changeLabel(); //billType存在的话执行changeLabel函数
          if(newVal=="doneTask"){
            this.message="弃审"
          }
      }
  },
  mounted(){
    this.processType=localStorage.getItem("processType");
    this.recordId=localStorage.getItem("recordId");
  },
  methods: {
    doAgree() {//批准   完成浪潮预算接口对接待验证
      if(!this.isPermitStrLength(this.message)){
        Toast(this.strMsg);
        return 
      }
      // 审批意见必填，当填写审批意见时才能请求接口
      if(this.message) {
        // 显示Loading
        this.showLoading = true;

        if(this.globalConfig.lcYusuanIflag && this.processType=="apportion"){//启用浪潮预算接口且是分摊调整单时使用
          //查询单据是否存在调用浪潮预算接口异常
          this.callService({
            params: {
              url: "/frm-secma-ise/adjustese/adjustese/getRollbackFlag?billId="+this.billId+"&",
              // jsonData: {
              //   billId: this.billId,
              // },
            },
          }).then((res) => {
            if (this.isBlank(res.detailMsg.data.msg)) {
              this.callService({
                params: {
                  url: "/eiap-plus/task/completetask/approveCard",
                  jsonData: {
                    taskId: this.taskId,
                    processInstanceId: this.processInstanceId,
                    processDefinitionId: this.processDefinitionId,
                    comment: this.message,
                    approvetype: "agree",
                  },
                },
              }).then((res1) => {
                // 接口请求成功关闭Loading
                this.showLoading = false;
                if (res1.data.flag == "success") {
                  //审批通过  在后端判断是否为最后一个审批人
                  //审批通过调用浪潮接口，预占转执行
                  let toastMag="提交成功";
                  this.callService({
                    params: {
                      url: "/frm-secma-ise/adjustese/adjustese/executeBudget?billId="+this.billId+"&processInstanceId="
                      +this.processInstanceId+"&processDefinitionId="+this.processDefinitionId+"&",
                      // jsonData: {
                      //   billId: this.billId,
                      //   processInstanceId: this.processInstanceId,
                      //   processDefinitionId: this.processDefinitionId,  //已弃用
                      //   taskId: this.taskId                             //已弃用
                      // },
                    },
                  }).then((res2) => {
                    toastMag=res2.detailMsg.data.msg==""?"提交成功":res2.detailMsg.data.msg;
                  });
                  Toast(toastMag);
                  this.goBackToList(this.globalConfig.comit_url_fc);
                }else if(res1.data.assignAble){//需要指派下一节点审批人的提交
                  Toast("需指派下一节点审批人,请在PC端操作");
                } else {
                  // Toast("当前任务已处理，无法操作");
                  Toast(res1.data.msg);
                }
              });            
            }else{
              // 接口请求成功关闭Loading
              this.showLoading = false;
              Toast(res.detailMsg.data.msg);
            }
          })
        }else{
          this.callService({
            params: {
              url: "/eiap-plus/task/completetask/approveCard",
              jsonData: {
                taskId: this.taskId,
                processInstanceId: this.processInstanceId,
                processDefinitionId: this.processDefinitionId,
                comment: this.message,
                approvetype: "agree",
              },
            },
          }).then((res) => {
            // 接口请求成功关闭Loading
            this.showLoading = false;
            //console.log("提交返回结果",res)
            if (res.data.flag == "success") {
              Toast("提交成功");
              this.goBackToList(this.globalConfig.comit_url_fc);
            }else if(res.data.assignAble){//需要指派下一节点审批人的提交
              Toast("需指派下一节点审批人,请在PC端操作");
            } else {
              // Toast("当前任务已处理，无法操作");
              Toast(res.data.msg);
            }
          });
        }
      }else {
        Toast("请填写审批意见");
      }
    },
    doReject() {//驳回   完成浪潮预算接口对接待验证
      if(!this.isPermitStrLength(this.message)){
        Toast(this.strMsg);
        return 
      }
    // 审批意见必填，当填写审批意见时才能请求接口
      if(this.message) {
        Dialog.confirm({
            title: '驳回提示',
            message: '将驳回至发起人，是否继续？',
          }).then(() => {
              // 显示Loading
              this.showLoading = true;
              if(this.globalConfig.lcYusuanIflag && this.processType=="apportion"){//启用浪潮预算接口且是分摊调整单时使用
                //查询单据是否存在调用浪潮预算接口异常
                this.callService({
                  params: {
                    url: "/frm-secma-ise/adjustese/adjustese/getRollbackFlag?billId="+this.billId+"&",
                    // jsonData: {
                    //   billId: this.billId,
                    // },
                  },
                }).then((res) => {
                  if (this.isBlank(res.detailMsg.data.msg)) {
                    //驳回发起人前，调用浪潮接口，取消预占
                    this.callService({
                      params: {
                        url: "/frm-secma-ise/adjustese/adjustese/cancelOccupyBudget?billId="+this.billId+"&",
                        // jsonData: {
                        //   billId: this.billId,
                        // },
                      },
                    }).then((res1) => {
                      if (this.isBlank(res1.detailMsg.data.msg)) {
                        //调用浪潮接口，取消预占成功后进行实际的驳回操作
                        this.callService({
                          params: {
                            url: "/eiap-plus/task/rejecttask/reject",
                            jsonData: {
                              taskId: this.taskId,
                              processInstanceId: this.processInstanceId,
                              activityId: this.activityId,
                              comment: this.message,
                              approvetype: "rejectToActivity",
                            },
                          },
                        }).then((res2) => {
                          if (res2.data.flag == "success") {
                            // 接口请求成功关闭Loading
                            this.showLoading = false;
                            Toast("提交成功");
                            this.goBackToList(this.globalConfig.comit_url_fc);
                          } else {
                            //管会驳回接口执行失败，回滚浪潮预算接口
                            this.callService({
                              params: {
                                url: "/frm-secma-ise/adjustese/adjustese/occupyBudget?billId="+this.billId+"&flag=5"+"&",
                                // jsonData: {
                                //   billId: this.billId,
                                //   flag: 5
                                // },
                              },
                            }).then((res3) => {
                              if (this.isBlank(res3.detailMsg.data.msg)) {
                                // 接口请求成功关闭Loading
                                this.showLoading = false;
                                Toast("管会流程异常，浪潮事务已回滚");
                              } else {
                                  //回滚异常时更新回滚异常状态
                                  this.callService({
                                    params: {
                                      url: "/frm-secma-ise/adjustese/adjustese/updateRollbackFlag?billId="+this.billId+"&flag=5"+"&",
                                      // jsonData: {
                                      //   billId: this.billId,
                                      //   flag: 5
                                      // },
                                    },
                                  }).then((res4) => {
                                    // 接口请求成功关闭Loading
                                    this.showLoading = false;
                                    Toast("管会流程异常，浪潮事务回滚异常，请手动回滚！");
                                  });
                              }
                            });
                          }
                        });
                      } else {
                        // 接口请求失败关闭Loading
                        this.showLoading = false;
                        Toast("预算接口调用失败:"+res1.detailMsg.data.msg);
                      }
                    });
                  }else{
                    // 接口请求成功关闭Loading
                    this.showLoading = false;
                    Toast(res.detailMsg.data.msg);
                  } 
                })
              }else{
                this.callService({
                  params: {
                    url: "/eiap-plus/task/rejecttask/reject",
                    jsonData: {
                      taskId: this.taskId,
                      processInstanceId: this.processInstanceId,
                      activityId: this.activityId,
                      comment: this.message,
                      approvetype: "rejectToActivity",
                    },
                  },
                }).then((res) => {
                  // 接口请求成功关闭Loading
                  this.showLoading = false;
                  if (res.data.flag == "success") {
                    Toast("提交成功");
                    this.goBackToList(this.globalConfig.comit_url_fc);
                  } else {
                    //Toast("操作失败，请刷新后重试");
                    //解决返回失败信息中有的冒号用的英文格式有的用的中文格式
                    Toast(res.data.msg && res.data.msg.replace("：",":").split(":")[1]);
                  }
                });
              }
          }).catch(() => {
              // on cancel
          });
      }else {
        Toast("请填写审批意见");
      }
    },
    doWithdraw() {//撤回的是任务
      if(!this.isPermitStrLength(this.message)){
        Toast(this.strMsg);
        return 
      }
      if(this.message) {
        // 显示Loading
        this.showLoading = true;
        if(this.globalConfig.lcYusuanIflag && this.processType=="apportion"){//启用浪潮预算接口且是分摊调整单时使用
          //查询单据是否存在调用浪潮预算接口异常
          this.callService({
            params: {
              url: "/frm-secma-ise/adjustese/adjustese/getRollbackFlag?billId="+this.billId+"&",
              // jsonData: {
              //   billId: this.billId,
              // },
            },
          }).then((res) => {
            if (this.isBlank(res.detailMsg.data.msg)) {
              this.callService({
                params: {
                  url: "/eiap-plus/task/withdrawtask/withdraw",
                  jsonData: {
                    taskId: this.taskId,
                    processInstanceId: this.processInstanceId,
                    processDefinitionId: this.processDefinitionId,
                    comment: this.message,
                    approvetype: "withdraw",
                  },
                },
              }).then((res) => {
                // 接口请求成功关闭Loading
                this.showLoading = false;
                if (res.data.flag == "success") {
                  Toast("提交成功");
                  this.goBackToList(this.globalConfig.comit_url_fc);
                } else {
                  //解决返回失败信息中有的冒号用的英文格式有的用的中文格式
                  Toast(res.data.msg && res.data.msg.replace("：",":").split(":")[1]);
                }
              });
            }else{
              // 接口请求成功关闭Loading
              this.showLoading = false;
              Toast(res.detailMsg.data.msg);
            }              
          });
        }else{
          this.callService({
            params: {
              url: "/eiap-plus/task/withdrawtask/withdraw",
              jsonData: {
                taskId: this.taskId,
                processInstanceId: this.processInstanceId,
                processDefinitionId: this.processDefinitionId,
                comment: this.message,
                approvetype: "withdraw",
              },
            },
          }).then((res) => {
            // 接口请求成功关闭Loading
            this.showLoading = false;
            if (res.data.flag == "success") {
              Toast("提交成功");
              this.goBackToList(this.globalConfig.comit_url_fc);
            } else {
              //解决返回失败信息中有的冒号用的英文格式有的用的中文格式
              Toast(res.data.msg && res.data.msg.replace("：",":").split(":")[1]);
            }
          });
        }
      }else {
        Toast("请填写审批意见");
      }
    },
    doRecall() {//收回的是流程  完成浪潮预算接口对接待验证
      Dialog.confirm({
          title: '收回提示',
          message: '将收回已发起流程，是否继续？',
        }).then(() => {
          let recallUrl="";
          if(this.processType=="apportion"){
            recallUrl="/frm-secma-ise/adjustese/adjustese/recall"
          }else{
            recallUrl="/frm-secma-ise/recordadd/recordadd/recall"
          }
          // 显示Loading
          this.showLoading = true;
          if(this.globalConfig.lcYusuanIflag && this.processType=="apportion"){//启用浪潮预算接口且是分摊调整单时使用
            //查询单据是否存在调用浪潮预算接口异常
            this.callService({
              params: {
                url: "/frm-secma-ise/adjustese/adjustese/getRollbackFlag?billId="+this.billId+"&",
                // jsonData: {
                //   billId: this.billId,
                // },
              },
            }).then((res) => {
              if (this.isBlank(res.detailMsg.data.msg)) {
                this.callService({
                  params: {
                    url: recallUrl,
                    jsonData: [{
                      id: this.recordId
                    }],
                  },
                }).then((res1) => {
                  // 接口请求成功关闭Loading
                  this.showLoading = false;
                  if (res1.data.success == "success"&&res1.data.detailMsg.data.success == "success") {
                    Toast("提交成功");
                    this.goBackToList(this.globalConfig.comit_url_fc);
                  } else {
                    Toast(res1.data.detailMsg.data.message);
                  }
                });
              }else{
                  // 接口请求成功关闭Loading
                  this.showLoading = false;
                  Toast(res.detailMsg.data.msg);
              }
            })
          }else{
            this.callService({
              params: {
                url: recallUrl,
                jsonData: [{
                  id: this.recordId
                }],
              },
            }).then((res) => {
              // 接口请求成功关闭Loading
              this.showLoading = false;
              if (res.data.success == "success"&&res.data.detailMsg.data.success == "success") {
                Toast("提交成功");
                this.goBackToList(this.globalConfig.comit_url_fc);
              } else {
                Toast(res.data.detailMsg.data.message);
              }
            });
          }
        }).catch(() => {
            // on cancel
        });
    },
    changeLabel($event, item) {
      this.message = item.label;
      this.selected = item.id;
    },
    setMsg(){
      this.message = "弃审";
    },
    goBackToList(url){
      setTimeout(() => {
        window.location.href = url;
      }, 1000);//1秒
      //clearTimeout(timerTemp);
    },
    /*  参数说明:
      str: 需要处理的字符串
      L: 需要限制的长度*/
    isPermitStrLength(str) {
      if (str.replace(/[^\x00-\xff]/g, '**').length <= 4000)  return true   // 字节长度  
      else return false
    },
    //是否为空字符串
    isBlank(data) {
      if (
        data == null ||
        data === 'null' ||
        data === ''
      ) {
        return true
      } else {
        return false
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../common/css/commonCss';
.suggestion-container {
  padding-bottom: 15px;
  .label {
    display: flex;
    margin-top: 10px;
    span {
      font-size: 12px;
      color: #333333;
      height: 25px;
      line-height: 4px;
      border: 1px solid #cccccc;
      border-radius: 5px;
      margin-right: 15px;
      box-sizing: border-box;
      padding: 10px 15px;
    }
    .selected {
      border: 1px solid #0C84FE; //#ea3939
      color: white;
      background: #0C84FE;
    }
  }
  .content {
    min-height: 75px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    margin-top: 10px;
    .van-field {
      font-size: 14px;
      color: #333333;
      padding: 4px;
    }
  }
}
.footer {
  box-sizing: border-box;
  display: flex;
  margin: 40px 0 130px 15px;
  .btnReject,
  .btnAgree,
  .btnSend,
  .btnRecall {
    width: 105px;
    height: 40px;
    //background: #ea3939;
    color: #ffffff;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    margin-right: 15px;
  };
}
// Loading样式
.van-overlay {
  background: transparent;
  display: flex; 
  align-items: center;
  justify-content: center;
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 105px;
    height: 105px;

    background: #000;
    opacity: 0.6;
    border-radius: 10px;
    .van-loading {
      color: #ffffff;
      .van-loading__text {
        color: #ffffff;
    }
    }
  }
}
</style>