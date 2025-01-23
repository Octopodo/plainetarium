import {defineStore } from 'pinia'
import { ref } from 'vue'
import {useImage} from '@vueuse/core'


export const useImageGalleryStore = defineStore( 'imageStore' , ()  => {
    const images = ref<string[]>([])
    const loaded = ref<boolean>(false)
    const error = ref<string | null>(null)

    const imagePath = '@/assets/textures/planets/'

    function fetchImages() {
        const paths = import.meta.glob('@/assets/textures/planets/*.{jpg,png}');
        images.value = Object.keys(paths).map((key) => {
            return key.replace('/', '')
        })
        const sto = 0
    }

    function update() {
        fetchImages()
    }

    function clear() {
        images.value = []
        loaded.value = false
        error.value = null
    }

    function getImage(id: string) {
        return images.value.find((image) => image === id)
    }

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.value.length)
        return images.value[randomIndex]
    }
    

    return {
        images,
        loaded,
        error,
        update,
        clear,
        getImage,
        getRandomImage
    }
})