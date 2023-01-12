import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormPessoaComponent} from "./components/form-pessoa/form-pessoa.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: 'pessoa', component: FormPessoaComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
