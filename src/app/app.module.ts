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

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    ReportLayoutComponent,
    ReportPageComponent,
    SpinnerComponent,
    CreateOccurrenceDialogComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
