
import {ref} from 'vue'
import * as Formatters from './formatters'
import { } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';


type FormatterType = keyof typeof Formatters;


export function useFormatter (source: string, type: FormatterType, ...args: any[]) {
  const formatter = new Formatters[type](source );
  const code = ref(formatter.format(source, ...args));

  return {
    code
  }
}

