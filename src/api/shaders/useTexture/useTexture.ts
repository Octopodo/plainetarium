import { ref , computed, watch} from 'vue'
import { type PropsValues } from '@/types'
import { ExtendedProps } from '@/api/props'
import { type PlainSphereParams, PlainSphereProps, usePlainSphere } from '@/api/shaders'
import { useSize, usePosition, type PositionPropsType, PositionProps } from '@/api/props'
import { transform } from 'typescript'



export interface TextureSphereParams extends PlainSphereParams,  PositionPropsType{
    textureSize: number,
    src: string,
}



export const TextureSphereProps = new ExtendedProps('TextureSphereProps', {
    ...PlainSphereProps.props,
    ...PositionProps.props,
    textureSize: {
        type: [Number, String],
        default: 50,
        min: 0,
        max: 100,
        control: 'range'
    },
    x: {
        type: [Number, String],
        default: 0,
        min: -100,
        max: 100,
        control: 'range'
    },
    y: {
        type: [Number, String],
        default: 0,
        min: -100,
        max: 100,
        control: 'range'
    },
    src: {
        type: String,
        default: 'src/assets/textures/planets/texture-1.jpg',
        control: 'string'
    },
})

export function useTexture(props: TextureSphereParams) {
    const { style: sphereStyle, width: sphereWidth } = usePlainSphere(props)

    const src = ref(props.src)
    const textureSize = ref(0)
    const center = computed(() => {
        return sphereWidth.value / 2 + textureSize.value / 2
    })
    
    const radius = computed(() => textureSize.value / 2)

    const proportion = computed(() => {
        return   props.textureSize /sphereWidth.value
    })
    
    function changeSize() {
        const {width: textureWidth, size: textureBaseSize} = useSize({width: props.textureSize, height: props.textureSize})
        
        // textureSize.value = ( (textureWidth.value + sphereWidth.value) * proportion.value ) * 10
        textureSize.value = textureBaseSize.x.value 
    }
    
    changeSize()

    watch(() => props.size, () => {
         changeSize()
    })

    watch(() => props.textureSize, () => {
        changeSize()
    })

    
    const { x: baseX, y: baseY} = usePosition(props)

    const cssX = computed(() => {
        // const value = baseX.value 
        const value = baseX.value - textureSize.value  + center.value
        return `${value}px`
    })
    const cssY = computed(() => {
        // const value = baseY.value
        const value = baseY.value - textureSize.value / 2 + center.value
        return `${value}px`
    })


    
    const textureStyle = computed(() => {
        const stop = ''
        return {
            top: cssY.value,
            left: cssX.value,
            position: 'absolute',
            width: `${textureSize.value}px`,
            height: `${textureSize.value}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform:'translate(-50%, -50%)',
            transformOrigin: 'center',
        }
        
    })

    return { textureStyle, sphereStyle, src }
}
    
