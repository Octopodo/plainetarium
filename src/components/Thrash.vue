<script setup>
import {
  StarField,
  LightSphere,
  PlainSphere,
  VolumeSphere,
  AtmoSphere
} from './components'
</script>

<template>
  <StarField
    :count="500"
    :width="3000"
    :height="1500"
    :minSize="1"
    :maxSize="3"
    :saturation="100"
    :opacity="100"
    :lightness="50"
    :blur="0"
  />
  <LightSphere
    :size="179"
    :opacity="50"
    :color="'#050a15'"
    :saturation="100"
    :lightness="50"
    :xRotation="0"
    :yRotation="0"
    :sharpness="10"
    :distance="90"
    :light="false"
    :dev="false"
  />
  <LightSphere
    :size="179"
    :opacity="23"
    :color="'#6113b6'"
    :saturation="100"
    :lightness="50"
    :xRotation="10"
    :yRotation="6"
    :sharpness="9"
    :distance="81"
    :light="true"
    :dev="false"
  />
  <PlainSphere
    :size="689"
    :opacity="38"
    :color="'#47b39e'"
    :saturation="100"
    :lightness="40"
    :dev="false"
  />
  <VolumeSphere
    :size="465"
    :opacity="13"
    :color="'#903b86'"
    :saturation="64"
    :lightness="59"
    :xRotation="-28"
    :yRotation="22"
    :lightColor="'#cb7067'"
    :lightOpacity="97"
    :lightDistance="35"
    :lightSharpness="36"
    :shadowColor="'#55d1d8'"
    :shadowOpacity="45"
    :shadowDistance="41"
    :shadowSharpness="64"
    :reflectionColor="'#404f6a'"
    :reflectionOpacity="76"
    :reflectionDistance="82"
    :reflectionSharpness="57"
    :reflectionReduction="80"
    :reflectionBlur="37"
    :dev="false"
  />
  <PlainSphere
    :size="298"
    :opacity="100"
    :color="'#f8f421'"
    :saturation="100"
    :lightness="50"
    :dev="false"
  />
  <LightSphere
    :size="298"
    :opacity="50"
    :color="'#050a15'"
    :saturation="100"
    :lightness="50"
    :xRotation="0"
    :yRotation="0"
    :sharpness="10"
    :distance="90"
    :light="false"
    :dev="false"
  />
  <LightSphere
    :size="298"
    :opacity="3"
    :color="'#050a15'"
    :saturation="100"
    :lightness="50"
    :xRotation="-5"
    :yRotation="1"
    :sharpness="89"
    :distance="100"
    :light="false"
    :dev="false"
  />
  <LightSphere
    :size="298"
    :opacity="42"
    :color="'#01e847'"
    :saturation="100"
    :lightness="50"
    :xRotation="-10"
    :yRotation="6"
    :sharpness="10"
    :distance="90"
    :light="true"
    :dev="false"
  />
  <PlainSphere
    :size="269"
    :opacity="7"
    :color="'#249f3d'"
    :saturation="-19"
    :lightness="98"
    :dev="false"
  />
  <PlainSphere
    :size="300"
    :opacity="34"
    :color="'#d14571'"
    :saturation="99"
    :lightness="9"
    :dev="false"
  />
  <LightSphere
    :size="280"
    :opacity="35"
    :color="'#67b763'"
    :saturation="-11"
    :lightness="28"
    :xRotation="26"
    :yRotation="-34"
    :sharpness="77"
    :distance="73"
    :light="false"
    :dev="false"
  />
  <VolumeSphere
    :size="575"
    :opacity="21"
    :color="'#816fe6'"
    :saturation="-12"
    :lightness="16"
    :xRotation="37"
    :yRotation="-23"
    :lightColor="'#ac952f'"
    :lightOpacity="62"
    :lightDistance="25"
    :lightSharpness="7"
    :shadowColor="'#be4220'"
    :shadowOpacity="36"
    :shadowDistance="3"
    :shadowSharpness="72"
    :reflectionColor="'#dffd87'"
    :reflectionOpacity="68"
    :reflectionDistance="95"
    :reflectionSharpness="64"
    :reflectionReduction="46"
    :reflectionBlur="7"
    :dev="false"
  />
  <PlainSphere
    :size="133"
    :opacity="11"
    :color="'#06b96b'"
    :saturation="71"
    :lightness="99"
    :dev="false"
  />
  <AtmoSphere
    :size="570"
    :opacity="29"
    :color="'#67e7a8'"
    :saturation="93"
    :lightness="58"
    :sharpness="85"
    :distance="90"
    :dev="false"
    :blur="4"
  />
  <LightSphere
    :size="543"
    :opacity="24"
    :color="'#44abf5'"
    :saturation="-5"
    :lightness="17"
    :xRotation="-43"
    :yRotation="45"
    :sharpness="73"
    :distance="75"
    :light="true"
    :dev="false"
  />
  <AtmoSphere
    :size="360"
    :opacity="35"
    :color="'#9b8b1d'"
    :saturation="50"
    :lightness="29"
    :sharpness="76"
    :distance="99"
    :dev="false"
    :blur="11"
  />
  <LightSphere
    :size="52"
    :opacity="33"
    :color="'#8c660e'"
    :saturation="80"
    :lightness="54"
    :xRotation="37"
    :yRotation="-8"
    :sharpness="69"
    :distance="94"
    :light="true"
    :dev="false"
  />
  <AtmoSphere
    :size="412"
    :opacity="24"
    :color="'#8f5086'"
    :saturation="61"
    :lightness="17"
    :sharpness="94"
    :distance="95"
    :dev="false"
    :blur="10"
  />
</template>
