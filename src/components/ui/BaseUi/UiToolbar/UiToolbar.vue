<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  
  const props = defineProps({
    prop: {
      type: String,
      required: true
    }
  })
  </script>
  <template>
    <div
      ref="UiToolbar"
      class="ui-toolbar"
    ></div>
  </template>
  
  <style scoped>
  .ui-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
