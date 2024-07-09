import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../pages/setting/setting.module').then( m => m.SettingPageModule)
      },
      {
        path: 'add-product',
        loadChildren: () => import('../pages/add-product/add-product.module').then( m => m.AddProductPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/apptabs/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
