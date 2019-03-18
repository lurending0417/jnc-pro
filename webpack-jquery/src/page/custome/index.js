import './index.less'

import '../../libs/Tdrag'
/**
 @param width 工作面板宽度
 @param height 工作面板高度
 @param num 背景网格分割份数（以高为基础）
 */

class EditWorkSpace {
    constructor(width, height, scales) {
        // 接受配置参数， 初始化面板
        this.result = [];
        this.width = width;
        this.height = height;
        this.scales = scales;
        this.minScale = width / scales;
        this.$box = $('#box');
        this.$main = $('#main');
        this.$canvas = $('canvas');
        this.context = this.$canvas[0].getContext('2d');
        this.init();
    }
    init() {
        this.initCanvas();
        this.renderData();
    }

    initCanvas() { //生成编辑面板
        let {context} = this;
        this.$canvas.css('width', this.width);
        this.$canvas.css('height', this.height);
        for (let i = 1; i < this.scales; i++) {
            context.moveTo(0, this.scales * i);
            context.lineTo(this.width, this.scales * i);
            context.strokeStyle = "#dddddd";
            context.stroke();
        }
        for (let j = 1; j < this.width /this.scales; j++) {
            context.moveTo(this.scales * j, 0);
            context.lineTo(this.scales * j, this.height);
            context.strokeStyle = "#dddddd";
            context.stroke();
        }
    }
    renderData() {
        // 清空节点
        this.$main.html('')
        if (this.result.length) {
            for (let data of this.result){
                //渲染行
                let newLine = `<div class="all" style="width: ${data.width};height: ${data.height};">`
                data.col.map((ab, count, self) => {
                    //渲染列
                    let newCol = `<div class="all" style="width: ${ab.width};height: ${ab.height};">`;
                    //给div添加左边框
                    if (count !== 0) {
                        newCol = `<div class="all left-border" style="width: ${ab.width};height: ${ab.height};"></div>`
                        let position = {
                            start: 0, // 存当前鼠标位置
                            start1: 0, //存上一个div的right
                            start2: 0, //存上一个div的width
                            start3: 0 //存这个div的width
                        }
                    }
                    newLine += `${newCol}</div>`;
                });
                this.$main.append(newLine);
            }
        }
    }
}




$(function () {
    let workSpace = new EditWorkSpace(1200, 800, 50, "body");
})
