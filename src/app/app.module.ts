import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from './features/report-page/components/map/map.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ReportLayoutComponent } from './pages/report-layout/report-layout.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './shared/components/spinner/spinner/spinner.component';
import { CreateOccurrenceDialogComponent } from './features/report-page/components/create-occurrence-dialog/create-occurrence-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { RegisterCitizenComponent } from './pages/register-citizen/register-citizen.component';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';

import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './pages/login/login.component';
import { RegisterTownComponent } from './pages/register-town/register-town.component';
import { ShowOccurrenceDialogComponent } from './features/report-page/components/show-occurrence-dialog/show-occurrence-dialog.component';
import {
  StorageModule,
  getStorage,
  provideStorage,
} from '@angular/fire/storage';
import { OnlyNumbersDirective } from './shared/only-numbers.directive';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    ReportLayoutComponent,
    ReportPageComponent,
    SpinnerComponent,
    CreateOccurrenceDialogComponent,
    RegisterCitizenComponent,
    LoginComponent,
    RegisterTownComponent,
    ShowOccurrenceDialogComponent,
    OnlyNumbersDirective,
    LoaderComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    StorageModule,
    AngularFireAuthModule,
  ],
  providers: [
    AngularFireModule,
    AngularFireAuth,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
