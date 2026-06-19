import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkbookComponent } from './workbook/workbook.component';
import { ContentComponent } from './workbook/content/content.component';

const routes: Routes = [
  {
    path: "",
    component: WorkbookComponent,
    title: "50th AGSM Brochure",
    children: [
      {
        path: "content/:id/:contentId", component: ContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
