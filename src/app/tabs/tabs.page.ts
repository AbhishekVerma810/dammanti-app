import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  selectTab: any;
  unreadMessages: any;
  tabs:any;
  constructor(private activateRoute: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.activateRoute.url.subscribe(url => {
   
    });
  }

  
  setCurrentTab(event:any) {
    console.log(event);
    this.selectTab = this.tabs.getSelected();
  }
  navigate() {
    this.router.navigate(['/apptabs/tabs/add-product'])
  }
}