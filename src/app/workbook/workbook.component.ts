import { Component } from '@angular/core';
import { Content, Paragraph, Section, SectionItem, TableOfContent, Workbook } from '../models/workbook';
import { BROCHURE } from '../instances/brochure';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.css']
})
export class WorkbookComponent {
  tableOfContent: Array<TableOfContent> = [];
  index = -1;
  animate = false;
  showOnMobile = false;
  itemsSelectionState: boolean[] = [];
  itemsOpenState: boolean[] = [];
  workbook: Workbook = BROCHURE;
  residents_images = ['Administrative Office', 'BP Area', 'Children Area', 'Consulting',
    'Entrance', 'Lab', 'Children Playing', 'Clinical Psychology', 'Consultant', 'Entrance',
    'Nurses Station', 'Residents Consulting', 'Sorting Hall', 'Hallway', 'HCT Room',
    'NHIS Clinic', 'Residents', 'Resident Consulting', 'Seminar Room', 'Sorting Hall'];
  resident_image = 'url(assets/images/50th.AGSM.Gold.Lights.Brochure.Cover.jpg)';
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.index === -1) {
      const childRoute = this.activatedRoute.firstChild;
      if (childRoute !== null) {
        this.subscription = childRoute.paramMap.subscribe({
          next: (paramMap) => {
            const id = paramMap.get('id');
            if (id !== null) {
              const asInt = parseInt(id);
              if (!isNaN(asInt)) {
                this.setIndexOnClick(asInt);
              }
            }
          }
        });
      }
    }

    this.tableOfContent = this.workbook.map(item => {
      let subheadings: string[] = [];

      if (item.pages) {
        let pages = item.pages as Content[];
        let content_with_sections = pages.filter((sub) => sub.metatype === 'section') as Section[];
        let content_with_subheadings = content_with_sections
          .filter((sub) => sub.metatype === 'subheading');

        subheadings = content_with_sections.flatMap((section) => {
          const sectionAsStrings = section.content.flatMap(_sectionContent => {
            const sectionContent = _sectionContent as Paragraph;
            if (sectionContent.metatype === 'subheading') return sectionContent.content;
            // if (sectionContent.metatype === 'section') 
            //   return this.findSubheading(sectionContent.content as SectionItem[]);
            return [] as string[];
          });

          return sectionAsStrings;
        });
      }

      return { title: item.heading, sections: subheadings }
    });

    this.itemsSelectionState = new Array(this.workbook.length).fill(false);

    this.itemsOpenState = new Array(this.workbook.length).fill(false);

    // this.firebaservice.setFirebaseConfig().subscribe
  }

  // planned to be used recur
  findSubheading(sectionContent: SectionItem[]): any {
    return sectionContent.flatMap(_sectionContent => {
      const sectionContent = _sectionContent as SectionItem;
      if (sectionContent.metatype === 'subheading') return sectionContent.content[0];
      if (sectionContent.metatype === 'section') return [];
      return [];
    });
  }

  setIndex(index: any): void {
    // this.index = index.index;
    // console.log("index =>", index.index);
    // this.setIndexOnClick(index.index);
  }

  setAnimation(): void {
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
      this.randomizeImage();
    }, 2000);
  }

  randomizeImage() {
    const rand = Math.random() * (this.residents_images.length - 1);
    const randInteger = Math.floor(rand);
    const imageFile = this.residents_images[randInteger].replace(' ', '_').toLowerCase();

    this.resident_image = 'url(../assets/residents/' + imageFile + '.jpg)';
  }

  setIndexOnClick = (index: number): void => {
    this.index = index;
    // if (this.index) this.setAnimation();

    let openOldState = this.itemsOpenState.slice();
    const openOldStateForIndex = this.itemsOpenState[index];

    // if (!oldStateForIndex) {
    // } else {
    //   this.itemsSelectionState = this.itemsSelectionState.fill(false);
    //   this.itemsSelectionState[index] = true;
    // }
    openOldState = openOldState.fill(false);
    openOldState[index] = !openOldStateForIndex;
    this.itemsOpenState = openOldState;
    this.showOnMobile = false;
  }

  showToc(): void {
    this.showOnMobile = !this.showOnMobile;
  }

  switchSection(index: number): void {
    const link = this.workbook[index].heading.replace(/[^\w\s]/g, '')
      .replace(/\s/g, "-").toLowerCase();
    this.router.navigateByUrl(
      `${this.router.url.split("/").slice(0, -2).join("/")}/${index}/${link}`
    ).then(() => {
      this.setIndexOnClick(index);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
