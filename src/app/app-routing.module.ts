import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'apptabs',
    loadChildren: () => import('./tabs/tabs.module').then(m=>m.TabsPageModule)
  },
  {
    path: '',
    redirectTo: '/apptabs/tabs/add-product',
    pathMatch: 'full'
  },

  {
    path: 'add-product',
    loadChildren: () => import('./pages/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'reminders',
    loadChildren: () => import('./pages/reminders/reminders.module').then( m => m.RemindersPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth-pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth-pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth-pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./auth-pages/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'welcome-screen',
    loadChildren: () => import('./auth-pages/welcome-screen/welcome-screen.module').then( m => m.WelcomeScreenPageModule)
  },
  {
    path: 'reset-password/:id',
    loadChildren: () => import('./auth-pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'select-language',
    loadChildren: () => import('./auth-pages/select-language/select-language.module').then( m => m.SelectLanguagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'account-settings',
    loadChildren: () => import('./pages/account-settings/account-settings.module').then( m => m.AccountSettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/setting/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'account-setting',
    loadChildren: () => import('./pages/setting/account-setting/account-setting.module').then( m => m.AccountSettingPageModule)
  },
  {
    path: 'term-conditions',
    loadChildren: () => import('./pages/setting/term-conditions/term-conditions.module').then( m => m.TermConditionsPageModule)
  },
  {
    path: 'feedbacks',
    loadChildren: () => import('./pages/setting/feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  },
  {
    path: 'help-and-support',
    loadChildren: () => import('./pages/setting/help-and-support/help-and-support.module').then( m => m.HelpAndSupportPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/setting/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
