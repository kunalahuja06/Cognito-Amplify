import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path:'',
    component: HomeComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
