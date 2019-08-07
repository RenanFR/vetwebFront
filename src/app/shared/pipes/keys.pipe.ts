import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'keys'})
export class KeysPipe implements PipeTransform{
    
    transform(myMap: any, ...args: any[]) {
        let keys = [];
        myMap.forEach((val: string, key: string) => {
            keys.push({key: key, value: val});
        });
        return keys;
    }

}