import naturalSort from 'javascript-natural-sort';
import { Pipe, PipeTransform } from '@angular/core';
import { FieldGetter, getFieldValue } from './FieldGetter';

@Pipe({
    name: 'naturalSort'
})
export class NaturalSortPipe implements PipeTransform {
    transform(value: any[], field?: string | FieldGetter) {
        if (Array.isArray(value)) {
            value = value.slice();
            value.sort((itemA, itemB) => {
                return naturalSort(getFieldValue(itemA, field), getFieldValue(itemB, field));
            });
        }
        return value;
    }

}
