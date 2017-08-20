export class Serializable {

    public static fromJson(json) {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }

}