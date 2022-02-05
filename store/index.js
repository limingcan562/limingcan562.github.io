import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        previewPicSrc: '',
        showPreviewPop: 0,
        canScroll: 1,
        viewClickTip: 0
    },
    mutations: {
        resetValueEvt(state, {key, value}) {
            state[key] = value;
        }
    }
});

export default store