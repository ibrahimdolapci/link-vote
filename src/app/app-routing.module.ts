import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksComponent, AddLinkComponent } from './lib/pages';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'list'
}, {
  path: 'list',
  component: LinksComponent
}, {
  path: 'add',
  component: AddLinkComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
