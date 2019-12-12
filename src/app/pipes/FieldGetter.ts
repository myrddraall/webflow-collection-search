export type FieldGetter = (item: any) => string;

export function getFieldValue(item: any, getter: string | FieldGetter) {

    let value;
    if (typeof (getter) === 'function') {
        value = getter(item);
    } else {
        const parts = getter.split('.');
        let prop = item;
        try {
            while (parts.length) {
                prop = prop[parts.shift()];
            }
            value = prop;
        } catch (e) {
            return null;
        }
    }
    return value;
}

