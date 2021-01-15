import { Directive, ViewContainerRef } from '@angular/core';


@Directive({ selector: '[appSidebarNotice]' })
export class SidebarNoticeDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}