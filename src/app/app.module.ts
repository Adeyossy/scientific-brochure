import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkbookComponent } from './workbook/workbook.component';
import { ContentComponent } from './workbook/content/content.component';
import { HeaderComponent } from './workbook/header/header.component';
import { MetatextComponent } from './workbook/metatext/metatext.component';
import { MetatypeComponent } from './workbook/metatype/metatype.component';
import { TocComponent } from './workbook/toc/toc.component';
import { TocItemComponent } from './workbook/toc-item/toc-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorkbookComponent,
    ContentComponent,
    HeaderComponent,
    MetatextComponent,
    MetatypeComponent,
    TocComponent,
    TocItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
