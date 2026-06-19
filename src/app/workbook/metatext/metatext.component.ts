import { Component, Input } from '@angular/core';
import { SectionItem } from 'src/app/models/workbook';

@Component({
  selector: 'app-metatext',
  templateUrl: './metatext.component.html',
  styleUrls: ['./metatext.component.css']
})
export class MetatextComponent {
  @Input() paragraph = '';
  parsedParagraph: SectionItem[] = [];
  links: SectionItem[] = [];
  splits: SectionItem[] = [];

  constructor() { }

  ngOnInit(): void {
    const test = 'Self-directed http://boyce.com online courses www.evidemy.com are accessible to membership candidates after subscription https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2239200/?page=1 ';
    const regex = /(?:http)?s?(?::\/\/)?(?:www\.)?\S{2,}\.\w{2,}(?:\/\S*)*/g;

    this.splits = this.paragraph.split(regex).map(item => {
      return {
        metatype: 'paragraph',
        content: [item]
      }
    });

    const matched = this.paragraph.match(regex);
    this.links = matched ? matched.map(item => {
      return {
        metatype: 'link',
        content: [
          item
        ]
      }
    }) : [];

    this.parsedParagraph = new Array(matched ? matched.length : 0 + this.splits.length);
    // this.parsedParagraph

    // if(matched) console.log(this.links, this.splits);
  }
}
