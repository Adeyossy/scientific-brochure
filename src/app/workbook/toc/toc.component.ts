import { Component, EventEmitter, Input, Output } from '@angular/core';
import { concatMap, map, Observable, of } from 'rxjs';
import { TableOfContent } from 'src/app/models/workbook';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css']
})
export class TocComponent {
  @Input() toc: Array<TableOfContent> = [];
  @Input() navIndex: number = -1;
  @Input() itemsSelectionState: boolean[] = [];
  @Input() itemsOpenState: boolean[] = [];
  tocLinks: TableOfContent[] = [];
  @Output() propagateIndex = new EventEmitter();
  loggingOut$: Observable<boolean> | null = null;
  user$: Observable<{email: string, uid: string}> = of();

  constructor() {
    // this.user$ = this.firebaservice.getFirebaseUser$();
  }

  ngOnInit(): void {
    this.tocLinks = this.toc.map(item => {
      item = Object.create(item);
      item.title = item.title.replace(/[^\w\s]/g, '').replace(/\s/g, "-").toLowerCase();
      item.sections = item.sections
        .map(sectionTitle => sectionTitle.replace(/[^\w\s]/g, '').replace(/\s/g, "-").toLowerCase());

      return item;
    });
  }

  ngDoCheck(): void {
  }

  changeState = (index: number): void => {
    this.propagateIndex.emit(index);
  }

  logout = (user: unknown) => {
    // this.loggingOut$ = user.email ? this.firebaservice.signOut$().pipe(map(_v => true)) : of(false);
  }
}
