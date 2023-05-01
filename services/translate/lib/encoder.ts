import {decodeString} from "./utils";

export function flattenDocument(document: Record<string, unknown>) {
    return flattenJSON(document);

    function flattenJSON(obj: any, res: any = {}, extraKey: string = ''): any {
        for (const key in obj) {
            if (typeof obj[key] !== 'object') {
                res[extraKey + key] = decodeString(obj[key]);
            } else {
                const newExtraKey = extraKey + key + '.';
                flattenJSON(obj[key], res, newExtraKey);
            }
        }
        return res;
    }
}

export function unFlattenDocument(document: Record<string, unknown>) {
    return unflatten(document);

    function unflatten(data){
        if (Object(data) !== data || Array.isArray(data))
            return data;
        const regex = /\.?([^.\[\]]+)$|\[(\d+)\]$/
        const props = Object.keys(data);
        let result, p;
        while (p = props.shift()) {
            const m = regex.exec(p)
            let target;
            if (m.index) {
                const rest = p.slice(0, m.index);
                if (!(rest in data)) {
                    data[rest] = m[2] ? [] : {};
                    props.push(rest);
                }
                target = data[rest];
            } else {
                if (!result) {
                    result = (m[2] ? [] : {});
                }
                target = result
            }
            target[m[2] || m[1]] = data[p];
        }
        return result;
    };

}