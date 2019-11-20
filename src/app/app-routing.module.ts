import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { VideoComponent } from './pages/video/video.component';
import { VideosComponent } from './pages/videos/videos.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'video/:id'   , component: VideoComponent, canActivate: [ AuthGuard ] },
  { path: 'videos'   , component: VideosComponent, canActivate: [ AuthGuard ] },
  { path: 'user/:id'   , component: UserComponent, canActivate: [ AuthGuard ] },
  { path: 'users'   , component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full',  redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
