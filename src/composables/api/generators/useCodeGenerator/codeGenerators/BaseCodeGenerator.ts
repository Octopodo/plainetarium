import { BeautifyFormatter } from "../codeFormatters/formatters";
import type { BaseFormatter } from "../codeFormatters/formatters/BaseFormatter";
import { type HTMLSource } from "@/types";
import {ref, type Ref} from 'vue'

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

    abstract generate(source: HTMLSource, ...args: any[]): void;
    format(code: string) {
        this.code.value = this.formatter.format(code)
    }
}


export type CodeGenerator = BaseCodeGenerator;