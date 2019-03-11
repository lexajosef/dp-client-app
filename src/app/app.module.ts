import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { HelpComponent } from './help/help.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    HomeComponent,
    EditorComponent,
    HelpComponent,
    UsersComponent,
    PostsComponent,
    PostComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
