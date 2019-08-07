import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { LoadingType } from '../models/loading.type';

@Injectable()
export class ProgressLoaderService {

    private subjectLoader = new Subject<LoadingType>();

    public loading(): Observable<LoadingType> {
        return this.subjectLoader.asObservable().pipe(startWith(LoadingType.STOP));
    }

    public start(): void {
        this.subjectLoader.next(LoadingType.START);
    }

    public stop(): void {
        this.subjectLoader.next(LoadingType.STOP);
    }

}