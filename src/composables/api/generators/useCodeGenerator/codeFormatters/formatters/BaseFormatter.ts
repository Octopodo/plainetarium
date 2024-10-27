
export abstract class BaseFormatter {
    source: string;
    abstract name: string;

    constructor(source: string = '') {
        this.source = source;
    }

    abstract format(source: string, ...args:any[]):string;
}

