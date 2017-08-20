
import { Serializable } from "./serializable.model";

export class ChatMessage extends Serializable {
    public name: string;
    public message: string;

    // public static fromJson(json: any) {
    //     const message = new ChatMessage();
    //     message.name = json.name;
    //     message.message = json.message;
    //     return message;
    // }

    constructor() {
        super();
    }

    public dump() {
        console.log(this.name, this.message);
    }
}   