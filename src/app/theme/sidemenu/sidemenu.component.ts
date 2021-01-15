import { filter } from 'rxjs/operators';
import { SettingsService } from '@core';
import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent implements OnInit {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  menus:any = []//this.menuService.getAll();

  constructor(private menuService: MenuService,private settingsService:SettingsService) {
    
  }

  ngOnInit(){
    this.menuService.getAll().subscribe(res => {
      this.menus = res;
      this.adminMenuFilter();
      this.userMenuFitler();
      this.purchaseManagerMenuFilter();
      this.processingMenufiter();
      this.POSMenuFilter();
      this.orderMenusFilter();
    })
  }

  // Delete empty values and rebuild route
  buildRoute(routes: string[]) {
    let route = '';
    routes.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }

  private adminMenuFilter(){
    if(this.settingsService.isAdmin) return;
    this.menus = this.menus.filter(menuItem => 
      menuItem.name != "menu.categories" && menuItem.name != "menu.banners" &&
      menuItem.name != "menu.unit" && menuItem.name != "menu.slot" &&
      menuItem.name != 'menu.address' && menuItem.name != 'menu.offers')
  }

  private userMenuFitler(){
    if(this.settingsService.isAdmin || this.settingsService.isPurchaseManager || this.settingsService.isManufaturingPlant || this.settingsService.isDepo) return;
    this.menus = this.menus.filter(menuItem => 
      menuItem.name != "menu.users")
  }

  private purchaseManagerMenuFilter(){
    if(this.settingsService.isPurchaseManager)
      this.menus = this.menus.filter(menuItem => 
         menuItem.name != "menu.items")
  }

  private processingMenufiter(){
    if(this.settingsService.isAdmin || this.settingsService.isManufaturingPlant || this.settingsService.isDepo || this.settingsService.isFranchise || this.settingsService.isHawker) return;
    this.menus = this.menus.filter(menuItem => 
      menuItem.name != "menu.processing")
  }

  private POSMenuFilter(){
    if(this.settingsService.isPOS){
      this.menus = this.menus.filter((menuItem => 
        menuItem.name == "menu.pos"))
    }else{
      this.menus = this.menus.filter((menuItem => 
        menuItem.name != "menu.pos"))
    }
  }

  private orderMenusFilter(){
    if(this.settingsService.isAdmin) return;
    this.menus.map(item => {
      if(item.name == 'menu.orders'){
        if(this.settingsService.isPurchaseManager){
          item.children = item.children.filter((menuItem => 
            menuItem.name != "menu.orders.transferorder" &&
            menuItem.name != "menu.orders.customerorder" &&
            menuItem.name != "menu.orders.hawkercustomerorder"))
        }else if(this.settingsService.isManufaturingPlant){
          item.children = item.children.filter((menuItem => 
            menuItem.name != "menu.orders.customerorder" &&
            menuItem.name != "menu.orders.hawkercustomerorder"))
        }else if(this.settingsService.isDepo){
          item.children = item.children.filter((menuItem => 
            menuItem.name != "menu.orders.purchaseorder"))
        }else if(this.settingsService.isHawker){
          item.children = item.children.filter((menuItem => 
            menuItem.name != "menu.orders.purchaseorder" &&
            menuItem.name != "menu.orders.customerorder"))
        }else if(this.settingsService.isRetailer){
          item.children = item.children.filter((menuItem => 
            menuItem.name != "menu.orders.purchaseorder" &&
            menuItem.name != "menu.orders.customerorder" &&
            menuItem.name != "menu.orders.hawkercustomerorder"))
        }else if(this.settingsService.isFranchise){
          item.children = item.children.filter((menuItem => 
            menuItem.name != "menu.orders.purchaseorder" &&
            menuItem.name != "menu.orders.customerorder" &&
            menuItem.name != "menu.orders.hawkercustomerorder"))
        }
      }
    })

    
  }
}
