import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from './features/report-page/components/map/map.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ReportLayoutComponent } from './layout/report-layout/report-layout/report-layout.component';
import { ReportPageComponent } from './features/report-page/report-page/report-page.component';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './shared/components/spinner/spinner/spinner.component';
import { CreateOccurrenceDialogComponent } from './features/report-page/components/create-occurrence-dialog/create-occurrence-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout/auth-layout.component';
import { RegisterComponent } from './layout/auth-layout/components/register/register.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './layout/auth-layout/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    ReportLayoutComponent,
    ReportPageComponent,
    SpinnerComponent,
    CreateOccurrenceDialogComponent,
    AuthLayoutComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
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
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    AngularFireModule,
    AngularFireAuth,
    AngularFirestore,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
