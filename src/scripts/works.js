import Vue from "vue";

const worksTags = {
    props: [
        "currentWork"
    ],
    template: "#works-tags",
    data() {
        return {
            tags: [],
        }
    },
};
const worksInfo = {
    props: [
        "currentWork"
    ],
    template: "#works-info",
    components: {
      worksTags
    },
    methods: {
    },
    mounted() {
    }
};
const worksBtns = {
    props: [
    ],
    template: "#works-btns",
    methods: {
    },
    mounted() {
    }
};
const worksThumbs = {
    props: [
        "works",
        "currentWork"
    ],
    template: "#works-thumbs",
    methods: {
    },
    mounted() {
    }
};

const worksCurrent = {
    props: [
        "currentWork",
        "works",
        "currentIndex"
    ],
    template: "#works-current",
    components: {
      worksThumbs,
      worksInfo,
      worksBtns
    },
    computed: {
        reverseWorks() {
            const works = [...this.works];
            return works.slice(0, 4).reverse();
        }
    },
    methods: {
    },
};

new Vue ({
    el: "#works-widget",
    template: "#works-container",
    components: {
      worksCurrent,
    },
    data() {
        return {
            works: [],
            currentIndex: 0
        }
    },
    computed: {
        currentWork() {
            return this.works[0]
        }
    },
    watch: {
        currentIndex(value) {
            this.indexToLoop(value);
        }
    },
    methods: {
        requireImages(data) {
            return(
                data.map(item => {
                    const requireImage = require(`../images/content/${item.photo}`).default;
                    item.photo = requireImage;
                    return item
                })
            )
        },
        slide(dir) {
            const lastWork = this.works[this.works.length - 1];
            switch(dir) {
                case "next":
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex++;
                    break;
                case "prev":
                    this.works.unshift(lastWork);
                    this.works.pop();
                    this.currentIndex--;
                break;
            }
        },
        indexToLoop(index) {
            if (index < 0) this.currentIndex = this.works.length - 1;
            if (index > this.works.length - 1) this.currentIndex = 0;
            
        }
        
    },
    created() {
        const data = require("../data/works.json");
        this.works = this.requireImages(data);
    },
});