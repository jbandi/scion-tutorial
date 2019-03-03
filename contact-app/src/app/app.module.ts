import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkbenchApplicationModule } from '@scion/workbench-application.angular';
import { SciViewportModule } from '@scion/viewport';
import { ContactActivityComponent } from './contact-activity/contact-activity.component';
import { ContactNewPopupComponent } from './contact-new-popup/contact-new-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactViewComponent } from './contact-view/contact-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactActivityComponent,
    ContactNewPopupComponent,
    ContactViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    WorkbenchApplicationModule.forRoot(),
    SciViewportModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
