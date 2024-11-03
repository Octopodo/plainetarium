import type {Layer, PropsValues, Control, LayerOptions} from '@/types'
import { useCreateControls } from '@/ui/controls/useCreateControls'
import { unWrapCamelCase } from '@/api/utils'



class BaseLayer {
    private id: string
    private parent: Layer | null
    component: any
    name: string
    children: Layer[]
    controls: Control[]
    props: PropsValues
    expanded: boolean
    visible: boolean
    solo: boolean
    soloHidden: boolean
    index: number
    selected: boolean
    locked: boolean


    constructor(options: LayerOptions) {
        const {
            component,
            expanded,
            visible,
            selected,
            index,
            parent,
            solo,
            soloHidden
          } = options
        this.id = options.id || '',
        this.parent =!parent ? null : parent,
        this.component = component,
        this.name =unWrapCamelCase(component.__name),
        this.children = [],
        this.controls = useCreateControls(component.props),
        this.props = {} as PropsValues,
        this.expanded = expanded || false,
        this.visible = visible || true,
        this.index = index || -1,
        this.selected =selected || false,
        this.soloHidden =soloHidden || false,
        this.solo = solo || false,
        this.locked = options.locked || false
        this.create(options);
    }

    private create(options: LayerOptions) {}
        
    
    call() {
        return  {
            id: this.id,
            parent: this.parent,
            component: this.component,
            name: this.name,
            children: this.children,
            controls: this.controls,
            props: this.props,
            expanded: this.expanded,
            visible: this.visible,
            solo: this.solo,
            soloHidden: this.soloHidden,
            index: this.index,
            selected: this.selected,
            locked: this.locked
        }
    }
}



function Layer(options: LayerOptions) {
    const instance = new Proxy(new BaseLayer(options), {
        apply: function(target) {
            return target.call();
        }
    });
}




