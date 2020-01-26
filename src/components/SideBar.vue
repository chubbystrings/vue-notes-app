<template>
    <div class="sidebar">
        <div class="sidebar-backdrop" @click="closeSideBar" v-if="isBarOpen"></div>
        <transition name="slide">
            <div class="sidebar-panel" v-if="isBarOpen">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>

export default {
    
    methods: {
        closeSideBar(){
            this.$store.dispatch('toggleNavBar')
        }
    },

    computed: {
        isBarOpen(){
            return this.$store.getters.navBar
        },
        
    }
    
}
</script>
<style scoped>



.slide-enter-active,
.slide-leave-active {
    transition: transform 3s ease
}

.slide-enter,
.slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
}

.sidebar-backdrop {
    background-color: rgba(0,0,0,0.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 100;
    
}

.sidebar-panel {
    overflow-y: auto;
    background-color: #4AAE9B;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px, 2rem 20px;
    width: 15rem;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: baseline;
}


</style>