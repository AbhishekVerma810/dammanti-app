import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPage
  },  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'account-setting',
    loadChildren: () => import('./account-setting/account-setting.module').then( m => m.AccountSettingPageModule)
  },
  {
    path: 'term-conditions',
    loadChildren: () => import('./term-conditions/term-conditions.module').then( m => m.TermConditionsPageModule)
  },
  {
    path: 'feedbacks',
    loadChildren: () => import('./feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  },
  {
    path: 'healp-and-support',
    loadChildren: () => import('./healp-and-support/healp-and-support.module').then( m => m.HealpAndSupportPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPageRoutingModule {}
