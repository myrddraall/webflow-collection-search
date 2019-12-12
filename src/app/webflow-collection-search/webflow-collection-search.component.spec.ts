import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebflowCollectionSearchComponent } from './webflow-collection-search.component';

describe('WebflowCollectionSearchComponent', () => {
  let component: WebflowCollectionSearchComponent;
  let fixture: ComponentFixture<WebflowCollectionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebflowCollectionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebflowCollectionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
