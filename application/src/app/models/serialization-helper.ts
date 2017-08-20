export class SerializationHelper {
    public static createInstance<T>(obj: T, jsonObj: any) : T {
        // var jsonObj = JSON.parse(json);
        obj = Object.assign(obj, jsonObj);
        // if (typeof obj["fromJSON"] === "function") {
        //     obj["fromJSON"](jsonObj);
        // }
        // else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        // }

        return obj;
    }
}