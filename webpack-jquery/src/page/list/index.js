class PieDataDriven {
    constructor () {

        this.view()

        this.init()
    }

    init() {
        let color = d3.schemeCategory10; // 生成随机颜色
        let dataset = [5,30,14, 35,65,10]; // 数据集合
        let pie = d3.layout.pie; // 饼状图

        let w = 300;
        let h = 300;

        let outerR = w/2; // 外半径
        let innerR = 0; // 内半径

        let arc = d3.svg.arc().outerRadius(outerR).innerRadius(innerR);
        let svg = d3.select('body').append("svg").attr('width', w).attr('height', h);

        let arcs = svg.selectAll('g.arc')
            .data(pie(dataset))
            .enter()
            .append('g')
            .attr('class', 'arc')
            .attr('transform', `translate('${outerR}', '${outerR}')`);

        arcs.append('path').attr('fill', function (d,i) {
            return color(i)
        }).attr('d', arc);

        arcs.append('text').attr('transform', function (d) {
            return `translate('${arc.centroid(d)}')`; // 定位文字到图形的中心
        })
            .attr('text-anchor', 'middle') // 文字居中
            .text(function (d) {
                return d.value;
            })
    }

    view() {
        console.log('layout', d3.layout)
        console.log('version', d3.version)
    }
}

class D3Tutorials {
    constructor() {
        this.p = d3.select('body').selectAll('p');
        this.init()
    }
    init() {
       // this.text()
       // this.datum()
       // this.data()
       // this.enter()
       this.exit();
       this.select1();
       this.append();
       this.insert();
       this.remove()
    }
    text() {
        this.p.text('Hello World');
    }
    datum() {
        let str = 'is an animal';
        this.p.datum(str).text(function (data, index) {
            return `第${index}个元素${data}`
        })
    }
    data() {
        let dataset = ['REF', 'FJD', 'FKI', 'ETP'];
        this.p.data(dataset).text(function (data, index) {
            return `第${index}个元素${data}`
        })
    }
    enter() {
        let dataset = ['REF', 'FJD', 'FKI', 'ETP', 'UIS', 'YUI'];
        let update = this.p.data(dataset);
        let enter = update.enter();
        console.log('enter', enter)

        update.text(function (data, index) {
            return  `update: ${data}, index: ${index}`
        })

        let pEnter = enter.append('p')
        pEnter.text(function (data, index) {
            return `enter: ${data}, index: ${index}`
        })
    }
    exit() {
        let dataset = ['REF', 'FJD', 'FKI'];
        let update = this.p.data(dataset);
        let exit = update.exit();
        console.log('enter', exit)

        update.text(function (data, index) {
            return  `update: ${data}, index: ${index}`
        })

        exit.text(function (data, index) {
            return `exit`
        })
    }
    select() {
        d3.select('body').select('p').text('第一个p').style('color', 'green');
    }
    select1() {
        let dataset = ['REF', 'FJD', 'FKI', 'ETP', 'UIS', 'YUI'];
        this.p.data(dataset).text(function (data, index) {
            if (index === 1) {
                d3.select(this).style('color', 'green')
            }
            return  data
        })
    }
    append() {
        d3.select('body').append('p').text('last one').style('color', 'blue')
    }
    insert() {
        d3.select('body').insert('p', '#third').text('insert an item')
    }
    remove() {
        d3.select('body').select('#third').remove()
    }
}

class Rect {
    constructor() {
        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
        this.dataset = [234, 128, 92, 320, 80];
        this.rectHeight = 30; // 矩形高度
        this.init()
    }

    init() {
        this.getSvg()
    }

    getSvg() {
        let svg = d3.select('svg');
        let g = svg.append('g').attr('transform', `translate(${this.margin.top}, ${this.margin.left})`)

        g.selectAll('rect').data(this.dataset).enter().append('rect').attr('x', 20).attr('y', function (data, index) {
            return index * this.rectHeight;
        }).attr('width', function (data, index) {
            return data
        }).attr('height', this.rectHeight - 5)
            .attr('fill', 'green')

    }
}

$(function () {
    // new PieDataDriven();
    // new D3Tutorials();
    new Rect();
})
