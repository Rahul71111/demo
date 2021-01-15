import { SidebarNoticeService } from './sidebar-notice.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { SidebarNoticeDirective } from './sidebar-notice.directive';

@Component({
  selector: 'app-sidebar-notice',
  // templateUrl: './sidebar-notice.component.html',
  template: `
    <ng-template appSidebarNotice></ng-template>`
})
export class SidebarNoticeComponent implements OnInit, OnDestroy {
  @ViewChild(SidebarNoticeDirective, { static: true})
  sidebar: SidebarNoticeDirective;
  private destroySubject = new Subject();

  constructor(private sidebarService:SidebarNoticeService) {}

  ngOnInit() {
    const viewContainerRef = this.sidebar.viewContainerRef;

    this.sidebarService.getComponent().subscribe(comp => {
      this.sidebarService.loadComponent(viewContainerRef,comp)
    })
      // .pipe(
      //   takeUntil(this.destroySubject),
      //   mergeMap(comp =>
        
      // )).subscribe();
    // this.profileService.isLoggedIn$
    //   .pipe(
    //     takeUntil(this.destroySubject),
    //     mergeMap(isLoggedIn =>
          // this.sidebarService.loadComponent(viewContainerRef)
      //   )
      // )
      // .subscribe();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
