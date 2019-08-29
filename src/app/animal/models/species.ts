export class Species {

    private _id: number;

    private _description: string;

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get id(): number {
        return this._id;
    }
    
    set id(value: number) {
        this._id = value;
    }        

}