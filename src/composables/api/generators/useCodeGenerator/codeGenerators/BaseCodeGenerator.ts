import { BeautifyFormatter } from "../codeFormatters/formatters";
import type { BaseFormatter } from "../codeFormatters/formatters/BaseFormatter";
import { type HTMLSource } from "@/types";
import {computed, ref, type Ref} from 'vue'

export abstract class BaseCodeGenerator {
    abstract name: string;
    selected = ref(false);
    code = ref('');
    formatter = new BeautifyFormatter();

    constructor(formatter?: BaseFormatter) {
        if (formatter) {
            this.formatter = formatter;
        }
    }

    abstract generate(source: HTMLSource, ...args: any[]): Promise<void>;
    format(code: string) {
        
            this.formatter.format(code).then((formattedCode) => {
                this.code.value = formattedCode;
                
            })
     
    }
}


export type CodeGenerator = BaseCodeGenerator;