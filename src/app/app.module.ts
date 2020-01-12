import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire'
import { AngularFireStorageModule} from "@angular/fire/storage";
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ExpenseRow } from './components/expenserow'
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
@NgModule({
  imports:      [ BrowserModule, FormsModule, AngularFireModule.initializeApp(environment.firebase),
  AngularFireStorageModule,AngularFireDatabaseModule],
  declarations: [ AppComponent, HelloComponent, ExpenseRow ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
