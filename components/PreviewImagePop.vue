<template>
<transition name="fadeIn"
    @after-leave="afterLeave"
    @after-enter="afterEnter"
>
    <section class="preview_content" v-show="showPreviewPop">

        <transition name="fadeIn">
            <div class="loading_content" v-show="!imgLoad"><Icon :width="35" class="loading_icon" /></div>
        </transition>

        <div 
            :class="['img_content', {show: imgLoad}]" 
            ref="ctrArea"
        >
            <div class="close_btn_content">
                <div class="close_btn"></div>
            </div>
            <div class="foreground_content">
                <img :src="previewPicSrc" ref="ctred_img" id="ctred_img">
            </div>
        </div>
    </section>
</transition>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
    data() {
        return {
            endX: 0,
            endY: 0,
            currentScale: 1,
            initialScale: 1,
            imgLoad: 0,

            hammerData: {
                moveX: 0,
                moveY: 0,
                scale: 1
            }
        }
    },
    
    computed: {
        ...mapState([
            'showPreviewPop',
            'previewPicSrc'
        ])
    },

    methods: {
        ...mapMutations([
            'resetValueEvt'
        ]),
        afterLeave() {
            this.resetValueEvt({key: 'canScroll', value: 1});
            this.imgLoad = 0;
            this.hammerData = {...this.hammerData, ...{moveX: 0, moveY: 0, scale: 1}};
            [this.endX, this.endY, this.endScale] = [0, 0, 1];
        },
        afterEnter() {
            this.$refs.ctred_img.onload = () => setTimeout(() =>this.imgLoad = 1, 500);
            this.$refs.ctred_img.src = this.$refs.ctred_img.src;
        },
        initHammer() {
            this.Ctr = new Hammer(this.$refs.ctrArea);
            this.Ctr.get('pinch').set({ enable: true });

            this.Ctr.on('pan panend pinch pinchend tap', ev => {
                const {type, deltaX, deltaY, scale} = ev;

                switch (type) {
                    case 'pan':
                        if(this.currentScale) this.initialScale = this.currentScale; 
                        // console.log(`移动了：${deltaX}`);
                        const
                        moveX = deltaX + this.endX,
                        moveY = deltaY + this.endY;

                        const obj = {
                            moveX,
                            moveY,
                            scale: this.currentScale
                        }
                        this.hammerData = {...this.hammerData, ...obj};
                        break;
                    case 'panend':
                        [this.endX, this.endY] = [deltaX + this.endX, deltaY + this.endY];
                        break;
                    case 'pinch':
                        this.currentScale = this.initialScale * scale;
                        this.hammerData = {...this.hammerData, ...{scale: this.currentScale}}
                        break;
                    case 'pinchend':
                        this.initialScale = this.currentScale;
                        break;
                        
                    case 'tap':
                        const {target: {id}} = ev;
                        // console.log(target.id);
                        !id && this.resetValueEvt({key: 'showPreviewPop', value: 0});
                        break;
                }
            });
        }
    },

    watch: {
        hammerData(val) {
            const {moveX, moveY, scale} = val;
            this.$refs.ctred_img.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale3d(${scale}, ${scale}, ${scale})`;
        }
    },

    mounted() {
        this.initHammer();
    }
}
</script>

<style lang="less" scoped>
.base{
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
}


.preview_content{
    .base;
    position: fixed;
    z-index: 999;
    background: rgba(0, 0, 0, .9);
    

    .loading_content{
        .base;
        display: flex;
        justify-content: center;
        align-items: center;

        .loading_icon{
            animation: load .75s linear infinite;
        }
    }

    .img_content{
        .base;
        padding: 0 20px;
        box-sizing: border-box;
        visibility: hidden;
        opacity: 0;

        &.show{
            visibility: visible;
            opacity: 1;
            transition: all .5s ease;
        }


        .close_btn_content{
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            margin-top: 5%;
            position: relative;
            z-index: 2;

            .close_btn{
                width: 40px;
                height: 40px;
                position: relative;

                &::after,
                &::before{
                    content: "";
                    width: 3px;
                    height: 20px;
                    background: #fff;
                    transform: translate(-50%, -50%) rotateZ(45deg);
                    left: 50%;
                    position: absolute;
                    top: 50%;
                }

                &::before{
                    transform: translate(-50%, -50%) rotateZ(-45deg);
                }
            }
        }

        

        .foreground_content{
            width: 100%;
            height: 85vh;
            position: relative;
            z-index: 1;
            margin: 0 auto;
            overflow: hidden;

            img{
                width: 100%;
            }
        }
    }



}

@keyframes load{
    0%{
        transform: translate3d(0,0,0);
    }
    50%{
        transform: translate3d(0,-20%,0);
    }
    100%{
        transform: translate3d(0,0,0);
    }

}


</style>