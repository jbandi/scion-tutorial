import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { WorkbenchApplicationPlatformModule } from '@scion/workbench-application-platform';
import { WorkbenchModule } from '@scion/workbench';

@NgModule({
  declarations: [AppComponent],
  imports: [
    WorkbenchModule.forRoot(),
    WorkbenchApplicationPlatformModule.forRoot({
      applicationConfig: [
        {
          symbolicName: 'contact-app',
          manifestUrl: 'http://localhost:4200/assets/manifest.json'
        },
        {
          symbolicName: 'communication-app',
          manifestUrl: 'https://scion-workbench-application-platform-communication.now.sh/assets/manifest.json'
        },
        {
          symbolicName: 'joke-app',
          manifestUrl: 'http://localhost:3000/scion/manifest.json'
        },
        {
          symbolicName: 'dev-tools-app',
          manifestUrl: 'https://scion-workbench-application-platform-devtools.now.sh/assets/manifest.json',
          scopeCheckDisabled: true
        }
      ]
    }),
    RouterModule.forRoot([], { useHash: true }),
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
