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
            @mousewheel="onMouseWheel"
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
            wheelScale: 1,
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
            this.hammerData = {...this.hammerData, ...{moveX: 0, moveY: 0, scale: 1}};
            [this.endX, this.endY, this.endScale] = [0, 0, 1];
            this.imgLoad = 0;
            this.currentScale = 1;
            this.initialScale = 1;
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
                        // !id && this.resetValueEvt({key: 'showPreviewPop', value: 0});
                        this.resetValueEvt({key: 'showPreviewPop', value: 0});
                        break;
                }
            });
        },

        onMouseWheel(ev) {
            let scal = 1;
            var scaleRo = 0.1;
            const {x, y} = ev;

            let dir = ev.wheelDelta < 0 ? 1 : 0;

            if (dir === 1) {
                // console.log(`往下滚动放大`);
                scal += scaleRo;
                this.currentScale = this.initialScale * scal;
            } else {
                scal -= scaleRo;
                if (this.currentScale <= scaleRo) return;
            }

            // this.$refs.ctred_img.style.transformOrigin = `${x}px ${y}px`;
            this.currentScale = this.initialScale * scal;
            this.hammerData = {...this.hammerData, ...{scale: this.currentScale}};
            this.initialScale = this.currentScale;

            // console.log(x, y);
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
    background: rgba(0, 0, 0, .8);

    .loading_content{
        max-width: 630px;
        .base;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;

        .loading_icon{
            animation: load .75s linear infinite;
        }
    }

    .img_content{
        max-width: 630px;
        .base;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 20px;
        box-sizing: border-box;
        visibility: hidden;
        opacity: 0;
        cursor: move;

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
            cursor: pointer;

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
                max-width: 100%;
                max-height: 100%;
                pointer-events: none;
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