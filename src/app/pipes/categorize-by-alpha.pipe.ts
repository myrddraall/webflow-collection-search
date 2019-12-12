import { Pipe, PipeTransform } from '@angular/core';
import { CategorizePipe } from './categorize.pipe';
import { ICategorizedList } from './ICategorizedList';
import { FieldGetter } from './FieldGetter';
import naturalSort from 'javascript-natural-sort';
@Pipe({
    name: 'categorizeByAlpha'
})
export class CategorizeByAlphaPipe implements PipeTransform {

    constructor(private categorizePipe: CategorizePipe) { }

    public transform(value: any[], labelGetter?: string | FieldGetter, useFullField?: boolean): ICategorizedList<any> {
        return this.categorizePipe.transform(value, (item) => {
            const label: string = this.categorizePipe.getCategoryLabel(item, labelGetter).trim();
            let firstChar = useFullField ? label : label.charAt(0).toUpperCase();
            if (!isNaN(firstChar as any)) {
                firstChar = '#';
            }
            return firstChar;
        }).sort((a, b) => {
            return naturalSort(a.label, b.label);
        });
    }
}
