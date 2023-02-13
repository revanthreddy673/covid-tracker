import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { CompareComponent } from './compare/compare.component';
import { StatedataComponent } from './statedata/statedata.component';
import { TotalstatsComponent } from './totalstats/totalstats.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/info',
    pathMatch: 'full'
  },
  {
    path: 'info',
    component: TotalstatsComponent
  },
  {
    path: 'statedata',
    component: StatedataComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
