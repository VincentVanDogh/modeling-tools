import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModelingToolsComponent} from "./modeling-tools/modeling-tools.component";

const routes: Routes = [
  {path: '', redirectTo: 'modeling-tools', pathMatch: 'full'},
  {path: 'modeling-tools', component: ModelingToolsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
