import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { VideoComponent } from './pages/video/video.component';
import { VideosComponent } from './pages/videos/videos.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import { PagesComponent } from './pages/pages.component';
import { AdminGuard } from './guards/admin.guard';
import { ReportesComponent } from './pages/reportes/reportes.component';

const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'home'    , component: HomeComponent},
            { path: 'video/:id'   , component: VideoComponent, canActivate: [AdminGuard] },
            { path: 'videos'   , component: VideosComponent, canActivate: [AdminGuard] },
            { path: 'user/:id'   , component: UserComponent, canActivate: [AdminGuard] },
            { path: 'users'   , component: UsersComponent, canActivate: [AdminGuard] },
            { path: 'reportes'   , component: ReportesComponent, canActivate: [AdminGuard] },
            { path: '', pathMatch: 'full',  redirectTo: '/home' },
        ]
    },
    { path: 'registro', component: RegistroComponent },
    { path: 'login'   , component: LoginComponent },
    { path: '**', pathMatch: 'full',  redirectTo: 'login' }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
