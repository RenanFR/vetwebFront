import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: "root"
})
export class PlatformRuntimeDetectorService {

    constructor(
        @Inject(PLATFORM_ID) private serverSideOrClientSideIdentifier: string
    ){}

    public checkIfItRunningOnBrowser(): boolean {
        let isBrowser:boolean = isPlatformBrowser(this.serverSideOrClientSideIdentifier);
        return isBrowser;
    }

}