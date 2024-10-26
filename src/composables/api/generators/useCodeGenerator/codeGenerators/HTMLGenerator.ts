import { type HTMLSource } from "@/types";
import { BaseCodeGenerator } from "./BaseCodeGenerator";


type HTMLParseArgs = [removeElements: string[], removeAttributes: boolean]

export class HTMLGenerator  extends BaseCodeGenerator {
    name = 'html';
    
    async generate(source: HTMLSource, ...args: HTMLParseArgs[]) {
        source = source as HTMLElement;
        source = source.outerHTML;

        let [removeElements, removeAttributes] = args;

        removeElements = removeElements || [];
        
        removeAttributes = removeAttributes || true;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = source !== null ? source.toString() : '';
    
        // Remove the elements that you don't want
        if (removeElements.length > 0) {
            const elementsToRemove = tempDiv.querySelectorAll(removeElements.join(','));
            elementsToRemove.forEach((element) => element.remove());
        }
        
    
        // Iterate over all elements and their attributes
        const allElements = tempDiv.querySelectorAll('*');
        if (removeAttributes) {
          allElements.forEach((element) => {
            [...element.attributes].forEach((attr) => {
              if (attr.name !== 'style' && attr.name !== 'class') {
                element.removeAttribute(attr.name);
              }
            });
          });
        }
    
        this.code.value = tempDiv.innerHTML;
    }
}

