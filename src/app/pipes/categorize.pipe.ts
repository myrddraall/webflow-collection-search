import { Pipe, PipeTransform } from '@angular/core';
import naturalSort from 'javascript-natural-sort';
import { ICategoryList } from './ICategoryList';
import { FieldGetter, getFieldValue } from './FieldGetter';
import { ICategorizedList } from './ICategorizedList';


@Pipe({
    name: 'categorize'
})
export class CategorizePipe implements PipeTransform {

    transform(value: any[], catGetter?: string | FieldGetter) {
        const catMap: { [key: string]: ICategoryList<any> } = {};
        const catList: ICategorizedList<any> = [];
        if (Array.isArray(value)) {
            for (const item of value) {
                const catLabel = this.getCategoryLabel(item, catGetter);
                if (!catMap.hasOwnProperty(catLabel)) {
                    catMap[catLabel] = {
                        label: catLabel,
                        items: []
                    };
                    catList.push(catMap[catLabel]);
                }
                const cat = catMap[catLabel];
                cat.items.push(item);
            }
            this.sortCategories(catList);
            return catList;
        }
    }

    public getCategoryLabel(item: any, getter: string | FieldGetter = 'category'): string {
        let cat = getFieldValue(item, getter);
        if (!cat) {
            cat = '#';
        }
        return cat;
    }

    private sortCategories(list: ICategorizedList<any>): ICategorizedList<any> {
        return list.sort((a, b) => {
            return naturalSort(a, b);
        });
    }

}
