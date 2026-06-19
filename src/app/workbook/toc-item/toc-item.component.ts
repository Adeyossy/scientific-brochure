import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableOfContent } from 'src/app/models/workbook';

@Component({
  selector: 'app-toc-item',
  templateUrl: './toc-item.component.html',
  styleUrls: ['./toc-item.component.css']
})
export class TocItemComponent {
  @Input() tocItem: TableOfContent = { title: "", sections: [] };
  @Input() tocItemIndex: number = 0;
  @Input() tocLink: TableOfContent = { title: "", sections: [] };
  @Input() isSelected: boolean = false;
  @Input() isOpen: boolean = false;
  @Input() navIndex: number = -1;
  @Output() propagateStateChange: EventEmitter<number> = new EventEmitter();

  subheadings: string[] = this.tocItem.sections;
  subheading_numbering = ['I.', 'II.', 'III.', 'IV.', 'V.', 'VI.', 'VII.',
    'VIII.', 'IX.', 'X.', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];

  constructor() { }

  ngOnInit(): void {
    // console.log('router.link => ', window.location.href.split('/')[4]);
  }

  changeSelectionState = (e: Event): void => {
    e.preventDefault();
    this.propagateStateChange.emit(this.tocItemIndex)
  }
}
