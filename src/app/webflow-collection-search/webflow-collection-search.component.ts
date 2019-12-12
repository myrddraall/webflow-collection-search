import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CollectionsItem } from './CollectionItem';
import { DomSanitizer } from '@angular/platform-browser';
import { ICategoryList } from '../pipes/ICategoryList';

interface SortDef {
  label: string;
  field: string;
  groupBy: 'first' | 'full';
  showGroupHeaders?: boolean;
}

interface WebflowCollectionSearchSettings {
  collectionId: string;
  tagField: string;
  sorts: SortDef[];
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'webflow-collection-search',
  templateUrl: './webflow-collection-search.component.html',
  styleUrls: ['./webflow-collection-search.component.scss']
})
export class WebflowCollectionSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('itemContainer', { read: ElementRef, static: false })
  private itemContainer: ElementRef<HTMLElement>;
  private collectionElement: HTMLElement;
  private collectionListElement: HTMLElement;
  public items: CollectionsItem[] = [];
  public currentSortIndex = 0;

  public currentFilter: { type: string, value: string } = { type: 'none', value: undefined };
  public settings: WebflowCollectionSearchSettings = {} as WebflowCollectionSearchSettings;

  public get collectionId(): string {
    return this.settings.collectionId;
  }

  public get tagField(): string {
    return this.settings.tagField || 'tags';
  }

  public get sorts(): SortDef[] {
    return this.settings.sorts || [];
  }

  public get currentSort(): SortDef {
    return this.sorts[this.currentSortIndex];
  }

  public get useFullField(): boolean {
    return this.currentSort.groupBy === 'full';
  }

  public get sortField(): string {
    return this.currentSort.field;
  }

  public get showGroupHeaders(): boolean {
    return this.currentSort.showGroupHeaders || false;
  }

  public setSort(index: number) {
    this.currentSortIndex = index;
  }




  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private domSanitizer: DomSanitizer,
    private changeDetect: ChangeDetectorRef,
    private ngZone: NgZone

  ) {
  }

  ngOnInit() {
    this.settings = JSON.parse(this.elementRef.nativeElement.querySelector('script[settings]').innerHTML);

    this.collectionElement = document.querySelector(`#${this.collectionId}`) as HTMLElement;
    this.collectionListElement = this.collectionElement.querySelector('.w-dyn-items');

    const items = this.collectionListElement.querySelectorAll('.w-dyn-item');
    items.forEach((element, index, parent) => {
      let dataString = element.querySelector('script[data]').innerHTML;
      dataString = dataString.replace(/"[^"]*(?:""[^"]*)*"/g, m => m.replace(/\n\s*/g, '\n').replace(/\n/g, '\\n'));
      const item: CollectionsItem = {
        data: JSON.parse(dataString),
        html: this.domSanitizer.bypassSecurityTrustHtml(element.outerHTML)
      };
      try {
        item.data[this.tagField] = item.data[this.tagField].split('\n');
      } catch (e) { }
      this.items.push(item);
    });
  }

  public ngAfterViewInit() {
    this.collectionListElement.remove();
    this.collectionElement.appendChild(this.itemContainer.nativeElement);

    this.collectionElement.classList.remove('hide-until-init');
    this.elementRef.nativeElement.classList.remove('hide-until-init');
  }

  public setFilter(type: string, value: string) {
    this.ngZone.run(() => {
      this.currentFilter = { type, value };
      this.changeDetect.markForCheck();
    });
  }

  public isFilter(type: string, value?: string): boolean {
    return !this.currentFilter
      ? false
      : (this.currentFilter.type !== type
        ? false
        : (value === undefined
          ? true
          : this.currentFilter.value === value
        )
      );
  }

  public filterCategories(type: string, value: string) {
    return (item: ICategoryList<CollectionsItem>, index: number): boolean => {
      if (type === 'none') {
        return false;
      }
      if ((type === 'alpha' || type === 'category') && value !== item.label) {
        return false;
      }
      if (type === 'text') {
        if (!value) {
          return false;
        }
        const children = item.items.filter(this.filterItems(type, value));
        return !!children.length;
      }
      return true;
    };
  }

  public filterItems(type: string, value: string) {
    return (item: CollectionsItem, index: number): boolean => {
      if (type === 'text') {
        if (!value) {
          return false;
        }
        value = value.toLowerCase();
        for (const key in item.data) {
          if (item.data.hasOwnProperty(key)) {
            let val = item.data[key];
            if (typeof val === 'string') {
              val = [val];
            }
            if (Array.isArray(val)) {
              for (let term of val) {
                term = term.toLowerCase();
                const found = term.indexOf(value) !== -1;
                if (found) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      }
      return true;
    };
  }

  public get isFilterEmpty(): boolean {
    return this.currentFilter === undefined ||
      this.currentFilter.type === 'none' ||
      this.currentFilter.value === undefined ||
      this.currentFilter.value === '';
  }

}
