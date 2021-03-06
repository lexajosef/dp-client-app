import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoaderInterceptor } from './_interceptors/loader.interceptor';

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
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { LoaderComponent } from './loader/loader.component';
import { UserComponent } from './user/user.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CommentsComponent } from './comments/comments.component';
import { GetFirstUpperCharPipe } from './_pipes/get-first-upper-char.pipe';

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
    CardComponent,
    DropdownMenuComponent,
    MenuItemComponent,
    LoaderComponent,
    UserComponent,
    ConfirmModalComponent,
    CommentsComponent,
    GetFirstUpperCharPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
