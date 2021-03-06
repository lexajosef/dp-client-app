import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './_guards/auth.guard';
import { LoggedGuard } from './_guards/logged.guard';
import { UnsavedPostGuard } from './_guards/unsaved-post.guard';

// Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { HelpComponent } from './help/help.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', canActivate: [LoggedGuard], component: LoginComponent },
  { path: 'registration', canActivate: [LoggedGuard], component: RegistrationComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'editor', canActivate: [AuthGuard], canDeactivate: [UnsavedPostGuard], component: EditorComponent },
  { path: 'editor/:postId', canActivate: [AuthGuard], canDeactivate: [UnsavedPostGuard], component: EditorComponent },
  { path: 'help', canActivate: [AuthGuard], component: HelpComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'posts', canActivate: [AuthGuard], component: PostsComponent },
  { path: 'post/:postId', canActivate: [AuthGuard], component: PostComponent },
  { path: 'user/:userId', canActivate: [AuthGuard], component: UserComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
