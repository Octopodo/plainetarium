<script lang="ts" setup>
import UiLayout from './BaseUi/UiLayout.vue'
import PlainSphere from '@/components/shaders/PlainSphere.vue'
import LightSphere from '@/components/shaders/LightSphere.vue'
import { ref } from 'vue'

const color = ref('#a0ed54')
const lightColor = ref('#040410')
const sharpness = ref(37) //min 0, max 100
const distance = ref(104) //min 0, max 140
const xRotation = ref(34) //min 0, max 200
const yRotation = ref(-41) //min 0, max 200
const size = ref(500) //min 50 max 1500
const opacity = ref(65) //min 0, maname
const light = ref(false)

const controls = [
  { type: 'color', model: color, name: 'Color', modelName: 'color' },
  {
    type: 'color',
    model: lightColor,
    name: 'Light Color',
    modelName: 'light-color'
  },
  { type: 'checkbox', model: light, name: 'Light', modelName: 'light' },
  {
    type: 'range',
    model: sharpness,
    name: 'Sharpness',
    modelName: 'sharpnes',
    min: 0,
    max: 150
  },
  {
    type: 'range',
    model: distance,
    name: 'Distance',
    modelName: 'distance',
    min: 0,
    max: 140
  },
  {
    type: 'range',
    model: xRotation,
    name: 'X Rotation',
    modelName: 'xRotation',
    min: -300,
    max: 300
  },
  {
    type: 'range',
    model: yRotation,
    name: 'Y Rotation',
    modelName: 'yRotation',
    min: -300,
    max: 300
  },
  {
    type: 'range',
    model: size,
    name: 'Size',
    modelName: 'size',
    min: 50,
    max: 1500
  },
  {
    type: 'range',
    model: opacity,
    name: 'Opacity',
    modelName: 'opacity',
    min: 0,
    max: 100
  }
]
</script>
<template>
  <div>
    <UiLayout
      :controls="controls"
      element-name="LightSphere"
    >
      <!-- <PlainSphere :color="color" :size="size">
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
      </PlainSphere> -->
    </UiLayout>
  </div>
</template>

<style></style>
