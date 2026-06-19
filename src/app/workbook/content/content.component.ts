import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, Subscription } from 'rxjs';
import { BROCHURE } from 'src/app/instances/brochure';
import { Chapter, ContentType, DEFAULT_NEW_CHAPTER, MetaType, Paragraph, Section, Workbook, WorkbookResponse } from 'src/app/models/workbook';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  index: any = -1;
  item: any = {};
  item$: Observable<Chapter> = of(DEFAULT_NEW_CHAPTER);
  index$: Observable<string> = of("");
  responses$: Observable<WorkbookResponse[]> = of([]);
  workshopId$: Observable<string> = of("");
  routeSubscription = new Subscription();
  workbook: Workbook = BROCHURE;
  @Output() emitIndex: EventEmitter<number> = new EventEmitter();
  @Output('activate') activate: EventEmitter<number> = new EventEmitter();
  residents_images = ['children_area.jpg', 'consulting.jpg', 'entrance.jpg', 'lab.jpg',
    'nurses_station.jpg', 'residents_consulting.jpg', 'sorting_hall_2.jpg'];
  resident_image: string = ''
  animate = false;
  offset = 0;
  // @Output('attach') attach: EventEmitter<number> = new EventEmitter();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    // this.workshopId$ = this.workshopService.getWorkshopId$(this.activatedRoute.parent!.paramMap);

    this.index$ = this.activatedRoute.paramMap.pipe(
      map(paramMap => {
        let id = paramMap.get("id");
        if (id === null) id = "-1";
        return id;
      })
    );

    // this.responses$ = this.index$.pipe(
    //   map(this.indexAsNumber),
    //   concatMap(this.workshopService.queryWorkbookResponses$)
    // );

    this.item$ = this.index$.pipe(
      map(this.indexAsNumber),
      map(id => this.workbook[id])
    );

    // this.item$ = this.index$.pipe(
    //   map(id => this.workbook[id]),
    //   concatMap(chapter => this.responses$.pipe(
    //     map(responses => {
    //       chapter.pages = chapter.pages.map(p => {
    //         const section = p.content;
    //         p.content = section.map(s => {
    //           let t = s as Paragraph | Section | MetaType;
    //           if (t.metatype === 'textarea') {
    //             t = t as Paragraph;
    //             const found = responses.find(r => r.inputId === t.content[0]);

    //             if (found) {
    //               t.content.push(found.answer)
    //             }

    //           }
    //           return t;
    //         });
    //         return p;
    //       });
    //       return chapter;
    //     })
    //   ))
    // );

    // this.randomizeImage();
  }

  indexAsNumber = (id: string) => {
    const num = parseInt(id);
    return isNaN(num) ? -1 : num
  }

  appendResponse = (content: ContentType, responses: WorkbookResponse[]): ContentType => {
    const first = content.content[0];
    if (typeof first === "string") {
      const paragraph = content as Paragraph;
      if (paragraph.metatype === "textarea") {
        const found = responses.find(r => r.inputId === first);
        if (found) paragraph.content.push(found.answer)
      }
      return paragraph;
    } else {
      const notParagraph = content as MetaType | Section;
      return notParagraph;
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const changedIndex = changes['index'];
  //   if (changedIndex.previousValue !== changedIndex.currentValue) {
  //     console.log("there has been a change in the index");
  //   }
  //   console.log("any changes at all");
  // }

  // randomizeImage() {
  //   const rand = Math.random() * (this.residents_images.length - 1);
  //   const randInteger = Math.floor(rand);

  //   this.resident_image = 'url(../../assets/residents/' 
  //   + this.residents_images[randInteger] + ')';
  // }

  getLink(index: number): string {
    return this.workbook[index].heading.replace(/[^\w\s]/g, '')
      .replace(/\s/g, "-").toLowerCase();
  }

  switchSection(index: number): void {
    const link = this.workbook[index].heading.replace(/[^\w\s]/g, '')
      .replace(/\s/g, "-").toLowerCase();
    this.router.navigateByUrl(`/content/${index}/${link}`);
  }

  calculatePagesOffset = (index: number) => {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.workbook[i].pages.length;
    }
    this.offset = offset;
    return this.offset;
  }
}
