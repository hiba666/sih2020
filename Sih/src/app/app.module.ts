import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    ComplaintComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
