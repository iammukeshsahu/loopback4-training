// Copyright (c) 2023 Sourcefuse Technologies
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { NbThemeModule, NbLayoutModule, NbChatModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { UserService } from './chat.service';
// import { NgxNotificationModule } from 'ngx-notification';

@NgModule({
  declarations: [AppComponent, LoginComponent, ChatComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbChatModule,
    NbEvaIconsModule,
    // NgxNotificationModule,
    NbThemeModule.forRoot(),
  ],
  providers: [UserService, PubNubAngular],
  bootstrap: [AppComponent],
})
export class AppModule {}
