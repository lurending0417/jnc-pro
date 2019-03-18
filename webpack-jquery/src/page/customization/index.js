/**
 @param width 工作面板宽度
 @param height 工作面板高度
 @param num 背景网格分割份数（以高为基础）
 */

import '../../libs/Tdrag'

import './index.less'

let EditWorkSpace ={
    result:'',
    getResult:function(){
        return EditWorkSpace.result
    },
    option:function(width,height,num,target){
        //生成编辑面板
        let box=document.createElement('div')
        box.style.height=height+'px';
        box.style.width=width+'px'
        let main=document.createElement('div')
        box.setAttribute('id','box');
        main.setAttribute('id','main')
        let canvas=document.createElement('canvas')
        let tar
        if(target ==='body'){
            tar=document.body
        }else{
            tar=document.getElementById('target')
        }
        tar.appendChild(box)
        box.appendChild(main)
        box.appendChild(canvas)

        //获得工作面板宽高
        let boxHeight=height;
        let boxWidth=width;
        let min=boxHeight/num //50代表把高分割成50份

        //绘制背景网格
        canvas.width = boxWidth;
        canvas.height = boxHeight;
        let context = canvas.getContext("2d");
        for (let i = 1; i <num; i++) {
            context.moveTo(0, min * i);
            context.lineTo(boxWidth, min * i);
            context.strokeStyle = "#dddddd";
            context.stroke();
        }
        for (let j = 1; j < boxWidth /min; j++) {
            context.moveTo(min * j, 0);
            context.lineTo(min * j, boxHeight);
            context.strokeStyle = "#dddddd";
            context.stroke();
        }
        //渲染数据
        let arrData = [];
        //渲染方法
        function rendering(){
            EditWorkSpace.result=arrData
            console.log('渲染源数据', arrData);
            //清空节点
            main.innerHTML = "";
            if (arrData.length){
                for (let data of arrData){
                    //渲染行
                    let newRowDiv = document.createElement("div");
                    newRowDiv.classList.add("all");
                    newRowDiv.style.height = data.height;
                    newRowDiv.style.width = data.width;
                    data.col.map((ab, count, self) => {
                        //渲染列
                        let newColDiv = document.createElement("div");
                        newColDiv.classList.add("all");
                        newColDiv.style.width = ab.width;
                        newColDiv.style.height = ab.height;
                        //给div添加左边框
                        if (count !== 0) {
                            newColDiv.classList.add("left-border");
                            let start;//存当前鼠标位置
                            let start1;//存上一个div的right
                            let start2;//存上一个div的width
                            let start3;//存这个div的width
                            //鼠标移动函数
                            const move = function(e){
                                if (e.clientX > box.offsetLeft + 3) {
                                    if (start1 + e.clientX - start > start1 + start3){
                                        self[count - 1].right = start1 + start3;
                                        self[count - 1].width = start2 + start3 + "px";
                                        self[count].width = "0px";
                                        $("body").unbind();
                                    } else if (start1 + e.clientX - start < start1 - start2) {
                                        self[count - 1].right = start1 - start2;
                                        self[count].width = start2 + start3 + "px";
                                        self[count - 1].width = "0px";
                                        $("body").unbind();
                                    } else {
                                        if(e.clientX-start>=min||e.clientX-start<=-min){
                                            let i=Math.floor((e.clientX-start)/min)
                                            self[count - 1].right = start1 + min*i;
                                            self[count - 1].width = start2 + min*i + "px";
                                            self[count].width = start3 - min*i + "px";
                                        }
                                    }
                                } else {
                                    self[count - 1].width = "0px";
                                    self[count].width = start3 + start2 + "px";
                                }
                                //删除width为0的元素
                                self.forEach((element, index) => {
                                    if (parseInt(element.width) <= 0) {
                                        self.splice(index, 1);
                                        $("body").unbind();
                                    }
                                });
                                rendering();
                            }
                            //控制鼠标样式
                            const mouse = function(e) {
                                if (e.clientX - box.offsetLeft - self[count - 1].right < 15){
                                    newColDiv.style.cursor = "e-resize";
                                } else {
                                    newColDiv.style.cursor = "auto";
                                }
                            }
                            $(newColDiv).on("mousemove", mouse);
                            newColDiv.onmousedown = function(e) {
                                start = e.clientX;
                                start1 = self[count - 1].right;
                                start2 = parseInt(self[count - 1].width);
                                start3 = parseInt(self[count].width);
                                if (e.clientX - box.offsetLeft - self[count - 1].right < 15) {
                                    $("body").on("mousemove", move);
                                }
                            };
                            newColDiv.onmouseup = function() {
                                console.log('鼠标松开');
                                $("body").unbind();
                            };
                        }
                        newRowDiv.appendChild(newColDiv);
                    });
                    main.appendChild(newRowDiv);
                }
            }
        }
        //增加列
        function addCol(x) {
            if (arrData.length === 0) {
                arrData.push({
                    height: boxHeight+"px",
                    width: "100%",
                    top: "0",
                    bottom: boxHeight,
                    col: [
                        { width: x + "px", height: "100%", right: x },
                        { width: boxWidth-2 - x + "px", height: "100%", right: boxWidth-2 }
                    ]
                });
            } else {
                for (let everyh of arrData) {
                    let index = everyh.col.findIndex(item => item.right > x);
                    let lastwidth = parseInt(everyh.col[index].width);
                    let lastright = everyh.col[index].right;
                    everyh.col[index].width = everyh.col[index - 1]
                        ? x - everyh.col[index - 1].right + "px"
                        : x + "px";
                    everyh.col[index].right = x;
                    everyh.col.splice(index + 1, 0, {
                        width: lastwidth - parseInt(everyh.col[index].width) + "px",
                        height: "100%",
                        right: lastright
                    });
                }
            }
            rendering();
        }
        //增加行
        function addRow(y) {
            if (arrData.length === 0){
                arrData.push({
                    width: "100%",
                    height: y + "px",
                    col: [{ width: boxWidth-2 + "px", height: "100%", right: boxWidth-2 }],
                    bottom: y
                });
                arrData.push({
                    width: "100%",
                    height: boxHeight - y + "px",
                    col: [{ width: boxWidth-2 + "px", height: "100%", right: boxWidth-2 }],
                    bottom: boxHeight
                });
            } else {
                let mid = JSON.stringify(arrData);
                let index = arrData.findIndex(item => item.bottom > y);
                let lastheight = arrData[index].height;
                let lastbottom = arrData[index].bottom;
                arrData[index].height = arrData[index - 1]
                    ? y - arrData[index - 1].bottom + "px"
                    : y + "px";
                arrData[index].bottom = y;
                arrData.splice(index + 1, 0, {
                    width: "100%",
                    height: parseInt(lastheight) - parseInt(arrData[index].height) + "px",
                    col: JSON.parse(mid)[index].col,
                    bottom: lastbottom
                });
            }
            rendering();
        }
        //生成列
        function right_sidebar(val) {
            let y = document.createElement("div");
            y.classList.add(val);
            y.classList.add("y");
            y.classList.add('aa');
            box.append(y);
            let pd = true;
            $(y).Tdrag({
                scope: "#box",
                axis: "x",
                grid: [min, min],
                cbStart: function() {
                    y.classList.remove('aa')
                    if (!y.style.left) {
                        right_sidebar(val)
                        pd = true;
                    } else {
                        pd = false;
                    }
                }, //移动前的回调函数
                cbMove: function() {}, //移动中的回调函数
                cbEnd: function() {
                    if (!y.style.left||y.style.left === "0px" || y.style.left === boxWidth+"px") {
                        box.removeChild(y);
                    } else {
                        if (pd) {
                            box.removeChild(y);
                            addCol(parseInt(y.style.left));
                        }
                    }
                } //移动结束时候的回调函数
            });
        }
        right_sidebar('a')
        right_sidebar('c')
        //生成行
        function bottom_topclic(val){
            let x = document.createElement("div");
            x.classList.add(val);
            x.classList.add('bb');
            x.classList.add("x");
            box.append(x);
            let pd = true;
            let initialtop;
            let indexc;
            let xtrue = true;
            let start;
            let start1;
            $(x).Tdrag({
                scope: "#box",
                axis: "y",
                grid: [min, min],
                cbStart: function() {
                    x.classList.remove('bb')
                    if (!x.style.top) {
                        bottom_topclic(val)
                        pd = true;
                    } else {
                        pd = false;
                        initialtop = parseInt(x.style.top);
                        arrData.map((item, index) => {
                            if (parseInt(x.style.top) === item.bottom) {
                                indexc = index;
                                start = parseInt(item.height);
                                start1 = parseInt(arrData[index + 1].height);
                            }
                        });
                    }
                }, //移动前的回调函数
                cbMove: function() {
                    if (!pd) {
                        //改变行高
                        if (xtrue){
                            arrData[indexc].height = arrData[indexc - 1]
                                ? parseInt(x.style.top) - arrData[indexc - 1].bottom + "px"
                                : x.style.top;
                            if (arrData[indexc - 1]) {
                                arrData[indexc].bottom =
                                    parseInt(x.style.top) >
                                    arrData[indexc - 1].bottom + start + start1
                                        ? arrData[indexc - 1].bottom + start + start1
                                        : parseInt(x.style.top);
                            } else {
                                arrData[indexc].bottom =
                                    parseInt(x.style.top) > start + start1
                                        ? start + start1
                                        : parseInt(x.style.top);
                            }
                            arrData[indexc + 1].height =
                                arrData[indexc + 1].bottom - parseInt(x.style.top) + "px";
                            if (parseInt(arrData[indexc].height) <= 0) {
                                if (parseInt(arrData[indexc + 1].height) > start + start1){
                                    arrData[indexc + 1].height = start + start1 + "px";
                                }
                                xtrue = false;
                                box.removeChild(x);
                                arrData.splice(indexc, 1);
                            } else if (parseInt(arrData[indexc + 1].height) <= 0) {
                                if (parseInt(arrData[indexc].height) > start + start1){
                                    arrData[indexc].height = start + start1 + "px";
                                }
                                xtrue = false;
                                box.removeChild(x);
                                arrData.splice(indexc + 1, 1);
                            }
                            rendering();
                        }
                    }
                }, //移动中的回调函数
                cbEnd: function() {
                    if (xtrue) {
                        if (pd) {
                            if (
                                !x.style.top ||
                                x.style.top === boxHeight+"px" ||
                                x.style.top === "0px"
                            ) {
                                box.removeChild(x);
                            } else if (x.style.top && x.style.top !== "0px") {
                                addRow(parseInt(x.style.top));
                            }
                        }
                    }
                } //移动结束时候的回调函数
            });
        };
        bottom_topclic('b')
        bottom_topclic('d')
    }
}


$(function () {
    this.EditWorkSpace = EditWorkSpace;
    this.EditWorkSpace.option(1200, 800, 50, "body");
    $('#saveBtn').click(() => {
        console.log('result', this.EditWorkSpace.getResult())
    })
})
