import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { DetailComponent } from './components/recipes/detail/detail.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoggedInGuard } from './logged-in.guard';
import { NewRecipeComponent } from './components/recipes/new-recipe/new-recipe.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', redirectTo: ''},
  { path: 'ricette', component: RecipesComponent, children: [
    { path: '', component: RecipesListComponent, pathMatch: 'full'},
    { path: 'dettaglio/:title/:_id', component: DetailComponent},
    { path: 'nuova-ricetta', component: NewRecipeComponent, canActivate: [LoggedInGuard]}
  ]},
  { path: 'registrazione', component: RegistrationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profilo', component: ProfileComponent, canActivate: [LoggedInGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

