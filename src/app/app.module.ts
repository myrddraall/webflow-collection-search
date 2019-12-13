import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { WebflowCollectionSearchComponent } from './webflow-collection-search/webflow-collection-search.component';
import { CategorizePipe } from './pipes/categorize.pipe';
import { CategorizeByAlphaPipe } from './pipes/categorize-by-alpha.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NaturalSortPipe } from './pipes/natural-sort.pipe';
import { FilterFnPipe } from './pipes/filter.pipe';
import { InsertHtmlDirective } from './webflow-collection-search/insert-html.directive';

@NgModule({
  declarations: [
    WebflowCollectionSearchComponent,
    CategorizePipe,
    CategorizeByAlphaPipe,
    NaturalSortPipe,
    FilterFnPipe,
    InsertHtmlDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [CategorizePipe, CategorizeByAlphaPipe, NaturalSortPipe, FilterFnPipe],
  entryComponents: [WebflowCollectionSearchComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }
  ngDoBootstrap() {
    const searchComp = createCustomElement(WebflowCollectionSearchComponent, { injector: this.injector });
    customElements.define('webflow-collection-search', searchComp);
  }
}
