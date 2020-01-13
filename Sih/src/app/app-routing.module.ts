import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintComponent } from './complaint/complaint.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{path:'',redirectTo:'complaint',pathMatch:"full"},
{path:"view",component:ViewComponent},{path:'complaint',component:ComplaintComponent}
,{path:"**",redirectTo:""}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
