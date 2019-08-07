import { Injectable } from "@angular/core";

@Injectable()
export class SettingsService {

    public getLocale(): string {
        return 'pt-BR';
    }

}