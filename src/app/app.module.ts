import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas
// import { AppRoutingModule } from './app-routing.module';
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VideoComponent } from './pages/video/video.component';
import { VideosComponent } from './pages/videos/videos.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { HeaderComponent } from './shared/header/header.component';
import { PagesComponent } from './pages/pages.component';
import { ReportesComponent } from './pages/reportes/reportes.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    VideoComponent,
    VideosComponent,
    UserComponent,
    UsersComponent,
    NgDropFilesDirective,
    HeaderComponent,
    PagesComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    APP_ROUTES,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
