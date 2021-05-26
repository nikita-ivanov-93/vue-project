import Vue from "vue";

const worksTags = {
    props: [
    ],
    template: "#works-tags",
    methods: {
    },
    mounted() {
    }
};
const worksInfo = {
    props: [
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
    ],
    template: "#works-thumbs",
    methods: {
    },
    mounted() {
    }
};

const worksCurrent = {
    props: [
    ],
    template: "#works-current",
    components: {
      worksThumbs,
      worksInfo,
      worksBtns
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
        }
    },
    created() {
    },
});