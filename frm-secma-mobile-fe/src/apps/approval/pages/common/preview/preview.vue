 <!--
 * @Author:liudan
 * @Date: 2022/03/18 16:02:25
 * @LastEditors: liufp
 * @LastEditTime: 2022/03/23 16:02:25
 * @Description:附件预览页面   暂时未用
 -->
<template>
    <div class="container">
        <!-- http://view.officeapps.live.com/op/view.aspx?src=[OFFICE_FILE_URL] -->
        <iframe src='https://view.xdocin.com/view?src=http://disc.static.szse.cn/disc/disk02/finalpage/2021-11-18/668539cf-bf83-493e-a9fa-c1d881022544.PDF#scrollbars=0&toolbar=0&statusbar=0' width='100%' height='700px' frameborder='0'>
        </iframe>

        <!-- <iframe src='https://api.idocv.com/view/url?url=http://disc.static.szse.cn/disc/disk02/finalpage/2021-11-18/668539cf-bf83-493e-a9fa-c1d881022544.PDF#scrollbars=0&toolbar=0&statusbar=0' width='100%' height='700px' frameborder='0'>
        </iframe> -->
    </div>
</template>

<script>
export default {
    name: 'preview',
    data() {
        return {
            fileURL: "",
            option: { l: 200, h: 150, top: '0' }
        }
    },

    created() {
        let datas = this.$route.params.file;
        this.setWatermark("liupf02012", this.option) // 调用水印函数
    },
    methods: {
        // 水印
        setWatermark (str, option = {}) {
            let id = 'Watermark';
            if (document.getElementById(id) !== null) {
            document.body.removeChild(document.getElementById(id));
            }
            //创建一个画布
            let can = document.createElement('canvas');
            //设置画布的长宽
            can.width = option.l || 100;
            can.height = option.h || 80;
            let cans = can.getContext('2d');
            cans.rotate(-20 * Math.PI / 180); // 旋转角度
            cans.font = '28px Calibri'; // 设置字体大小
            cans.fillStyle = 'rgba(185, 179, 179, 0.35)'; // 设置填充绘画的颜色、渐变或者模式
            cans.textAlign = 'left'; // 设置文本内容的当前对齐方式
            cans.textBaseline = 'Middle'; // 设置在绘制文本时使用的当前文本基线
            cans.fillText(str, can.width / 8 - 20, can.height / 2); // 输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置
            let div = document.createElement('div');
            div.id = id;
            div.style.pointerEvents = 'none';
            div.style.position = 'fixed';
            div.style.top = option.top || '0';
            div.style.left = option.left || '0';
            div.style.width = option.width || document.documentElement.clientWidth + 'px';
            div.style.height = option.height || document.documentElement.clientHeight + 'px';
            div.style.fontWeight = 'lighter';
            div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
            div.style.zIndex = '0';
            document.body.appendChild(div);
            return id;
        },
    },
    beforeDestroy() {
        let id = 'Watermark';
        if(document.getElementById(id) !== null) {
            document.body.removeChild(document.getElementById(id))
        }
    }
}
</script>
<style lang="scss">
    .container {
        color: rgba(185, 179, 179, 0.35);
    }
</style>