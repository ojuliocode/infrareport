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

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    ReportLayoutComponent,
    ReportPageComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
