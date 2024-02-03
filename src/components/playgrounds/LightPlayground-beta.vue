<script setup lang="ts">
import { ref, watch } from 'vue'
import PlainSphere from '@/components/PlainSphere.vue'
import LightSphere from '@/components/LightSphere.vue'

const color = ref('#552500')
const lightColor = ref('#040410')
const sharpness = ref(50) //min 0, max 100
const distance = ref(115) //min 0, max 140
const xRotation = ref(0) //min 0, max 200
const yRotation = ref(0) //min 0, max 200
const size = ref(300) //min 50 max 1500
const lightSize = ref(300) //min 50 max 1500
const opacity = ref(100) //min 0, max 100
const light = ref(false)
</script>

<template>
  <div class="playground">
    <div class="content">
      <div class="controls">
        <label>
          Color:
          <input type="color" v-model="color" />
          {{ color }}
        </label>
        <label>
          Color:
          <input type="color" v-model="lightColor" />
          {{ lightColor }}
        </label>
        <label>
          Light:
          <input type="checkbox" v-model="light" />
          {{ light }}
        </label>
        <label>
          Sharpness:
          <input type="range" min="0" max="150" v-model.number="sharpness" />
          {{ sharpness }}
        </label>
        <label>
          Distance:
          <input type="range" min="0" max="140" v-model.number="distance" />
          {{ distance }}
        </label>
        <label>
          X Rotation:
          <input type="range" min="-300" max="300" v-model.number="xRotation" />
          {{ xRotation }}
        </label>
        <label>
          Y Rotation:
          <input type="range" min="-300" max="300" v-model.number="yRotation" />
          {{ yRotation }}
        </label>
        <label>
          Size:
          <input type="range" min="50" max="1500" v-model.number="size" />
          {{ size }}
        </label>
        <label>
          Opacity:
          <input type="range" min="0" max="100" v-model.number="opacity" />
          {{ opacity }}
        </label>

        <div class="output">
          <h1 class="output-title">OUTPUT</h1>
          <p class="output-tag">&lt;LightSphere</p>
          <p class="output-content">
            :color="{{ color }}" <br />
            :size="{{ size }}" <br />
            :xRotation="{{ xRotation }}" <br />
            :yRotation="{{ yRotation }}" <br />
            :sharpness="{{ sharpness }}" <br />
            :distance="{{ distance }}" <br />
            :opacity="{{ opacity }}" <br />
            :light-color="{{ lightColor }}" <br />
          </p>
          <p class="output-tag">/&gt;</p>
        </div>
      </div>
      <div class="viewport">
        <PlainSphere :color="color" :size="size">
          <LightSphere
            :xRotation="xRotation"
            :yRotation="yRotation"
            :sharpness="sharpness"
            :distance="distance"
            :opacity="opacity"
            :size="size"
            :light-color="lightColor"
            :light="light"
          />
        </PlainSphere>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewport {
  position: fixed;
  top: 200px;
}

.controls {
  position: fixed;
  top: 100px;
  left: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

.controls label {
  display: block;
  margin-bottom: 10px;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}

.control {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.output {
  background-color: #0d0d0d;
  padding: 20px 40px;
  font-size: 1.2rem;
  color: #1cfb41;
  text-shadow: rgba(1, 255, 43, 0.9) 0px 0px 5px;
  cursor: text;
}

.output-tag {
  color: rgba(255, 241, 174, 0.9);
  text-shadow: rgba(255, 213, 1, 0.9) 0px 0px 6px;
  font-size: 1.5rem;
  margin: 0;
}

.output-content {
  margin-left: 40px;
}
h1 {
  padding: 0 0 10px 0;
  /* font-size: 3rem; */
  color: #ffffff;
  text-shadow: rgba(253, 253, 253, 0.9) 0px 0px 6px;
}
</style>
