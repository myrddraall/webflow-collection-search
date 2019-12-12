import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFn'
})
export class FilterFnPipe implements PipeTransform {
    transform(value: any[], filterFn: (element: any, index: number) => boolean) {
        if (Array.isArray(value)) {
            value = value.filter(filterFn);
        }
        return value;
    }
}
