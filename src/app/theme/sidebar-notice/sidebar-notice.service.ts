import { BehaviorSubject } from 'rxjs';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { SettingsService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class SidebarNoticeService {

  constructor(private cfr: ComponentFactoryResolver,
    private settings: SettingsService) { }

  private component:BehaviorSubject<any> = new BehaviorSubject(null);
  private is_opened:BehaviorSubject<boolean> = new BehaviorSubject(false);
  options = this.settings.getOptions();

  public setComponent(comp:any){
    this.component.next(comp)
  }

  public getComponent(){
    return this.component.asObservable();
  }

  public setIsOpened(isOpened:boolean){
    this.is_opened.next(isOpened);
  }

  public getIsOpened(){
    return this.is_opened.asObservable();
  }

  public toggle(){
    this.is_opened.next(!this.is_opened);
  }

  async loadComponent(vcr: ViewContainerRef,comp:any) {
    
    if(!comp) return;
    // const { ItemViewComponent } = await import('../../routes/items/components/item-view/item-view.component');

    // const { UserCardComponent } = await import('./user-card/user-card.component');

    vcr.clear();
    // let component : any = ItemViewComponent
   
    return vcr.createComponent(
      this.cfr.resolveComponentFactory(comp))    
  }

  public sidenavOpenedChange(isOpened: boolean) {
    // this.options.sidenavOpened = isOpened;
    // this.settings.setNavState('opened', isOpened);

    // // this.collapsedWidthFix = !this.isOver;
    // this.resetCollapsedState();
    
  }

  resetCollapsedState(timer = 400) {
    // TODO: Trigger when transition end
    setTimeout(() => {
      this.settings.setNavState('collapsed', this.options.sidenavCollapsed);
    }, timer);
  }
}
