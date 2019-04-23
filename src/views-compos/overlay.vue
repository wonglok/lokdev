<template>
  <div class="fixer">
    <div class="layer layer_1" @click="$emit('enter', false)">
      <img class="close-icon" src="../assets/icons/close-white.svg" alt="Close" title="Close" @click="$emit('enter', false)">
    </div>
    <div class="scroller">
      <div class="layer_2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.fixer{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.fuller{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.scroller{
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.close-icon{
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin: 40px;
}

.layer{
  position: absolute;
}

.layer_1{
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  cursor: pointer;
}

.layer_2{
  height: 3600px;

  width: calc(100% - 100px - 100px);
  min-height: calc(100% - 100px);
  -webkit-overflow-scrolling: touch;
  background-color: rgba(255,255,2550.7);

  animation: movein 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s 1 normal both;
  margin-top: 100px;
  margin-bottom: 100px;
  margin-left: 100px;
}

@keyframes movein {
  0%{
    transform: translateY(100%);
  }
  100%{
    transform: translateY(0%);
  }
}
</style>
