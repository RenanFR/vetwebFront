import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private titleHandler: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ){
    translate.setDefaultLang('pt');
    translate.use('pt');
  }  

  ngOnInit(): void {
    this.router.events
      .pipe(filter((routeEvent) => routeEvent instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((routeItem) => {
        while (routeItem.firstChild) {
          routeItem = routeItem.firstChild;
          return routeItem;
        }
      }))
      .pipe(switchMap((currentRoute) => currentRoute.data))
      .subscribe((dataPropertiesFromRoute) => this.titleHandler.setTitle(dataPropertiesFromRoute.title));
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }  

}
