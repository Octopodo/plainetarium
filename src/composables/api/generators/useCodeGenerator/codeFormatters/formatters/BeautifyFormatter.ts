import { BaseFormatter } from "./BaseFormatter";
import beautify from 'js-beautify';
import Prism from 'prismjs';

type BeautifyFormatterArgs = [indent: number];

export class BeautifyFormatter extends BaseFormatter {
    name = 'Beautify';

    format(source: string, ...args: BeautifyFormatterArgs[]): string {
        let indent = args.length ? args[0] : 2;
        indent = indent as number;
        const formattedHtml = beautify.html(source, {
            indent_size: indent,
            wrap_attributes: 'force-expand-multiline'
          })
        
          const highlightedHtml = Prism.highlight(
            formattedHtml,
            Prism.languages.html,
            'html'
          )
        return highlightedHtml;
    }
}