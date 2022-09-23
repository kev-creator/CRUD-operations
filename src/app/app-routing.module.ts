import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUsersComponent } from './user/add-users/add-users.component';
import { DeleteUsersComponent } from './user/delete-users/delete-users.component';
import { EditUsersComponent } from './user/edit-users/edit-users.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { ViewUsersComponent } from './user/view-users/view-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'users',
    children: [
      { path: '', component: ListUsersComponent },
      { path: 'list', component: ListUsersComponent },
      { path: 'view/:id', component: ViewUsersComponent },
      { path: 'edit/:id', component: EditUsersComponent },
      { path: 'delete/:id', component: DeleteUsersComponent },
      { path: 'create', component: AddUsersComponent },
    ],
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./roles/roles.module').then((m) => m.RolesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
