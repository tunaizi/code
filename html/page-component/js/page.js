var mypage = {
    template: "#mypage",
    data() {
        return {
            date: "",
            pageIndex: 1,
            list: [],
        }
    },
    props: ["count", "showpage", "shownum"],

    watch: {
        pageIndex(index) {
            this.list = [];
            if (index < this.mid) {
                this.start = 1;
                this.end = this.showpage > this.maxPage ? this.maxPage : this.showpage;
            };
            if (index > this.mid) {
                this.start = index - this.mid;
                this.end = index + this.mid;
            };
            if (index > this.maxPage - this.mid) {
                // this.start = this.maxPage - 2 * this.mid;
                //此段代码同下面的代码效果一样都可以使用效果也一样!
                this.start = this.maxPage - this.showpage + 1;
                this.end = this.maxPage;

            }
            // this.start = this.start <= 1 ? 1 : this.start;
            //起始index是否小于等于1小于1等于1!!!!
            for (var i = this.start; i <= this.end; i++) {
                this.list.push(i)
            }
            this.$emit("getpage", index);
            //在监听里面再次渲染一遍!
        }
    },
    created() {
        this.maxPage = Math.ceil(this.count / this.shownum);
        //向上取整最大数据除去每页显示多少条等于最大的index页码;
        this.start = 1;
        this.end = this.showpage > this.maxPage ? this.maxPage : this.showpage;
        for (let i = this.start; i <= this.end; i++) {
            this.list.push(i);
        }
        this.mid = Math.floor(this.showpage / 2);
    },
    methods: {
        prev() {
            this.pageIndex--
        },
        next() {
            this.pageIndex++

        },
        clicPageBox(item) {
            this.pageIndex = item;
        }
    },
}