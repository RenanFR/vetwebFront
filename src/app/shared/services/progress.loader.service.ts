import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { LoadingType } from '../models/loading.type';

@Injectable()
export class ProgressLoaderService {

    private switchLoader = new Subject<LoadingType>();
    private progressUpdate = new Subject<number>();

    public loading(): Observable<LoadingType> {
        return this.switchLoader.asObservable().pipe(startWith(LoadingType.STOP));
    }

    public progress(): Observable<number> {
        return this.progressUpdate.asObservable();
    }

    public start(): void {
        this.switchLoader.next(LoadingType.START);
    }

    public increment(by: number): void {
        this.progressUpdate.next(by);
    }

    public stop(): void {
        this.switchLoader.next(LoadingType.STOP);
    }

}