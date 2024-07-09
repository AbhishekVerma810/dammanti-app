import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealpAndSupportPage } from './healp-and-support.page';

const routes: Routes = [
  {
    path: '',
    component: HealpAndSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealpAndSupportPageRoutingModule {}
