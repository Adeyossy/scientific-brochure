import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { concatMap, map, Observable, of } from 'rxjs';
import { Content, MetaType, Page, Paragraph, Section, SectionItem, Table, WorkbookResponse } from 'src/app/models/workbook';

@Component({
  selector: 'app-metatype',
  templateUrl: './metatype.component.html',
  styleUrls: ['./metatype.component.css']
})
export class MetatypeComponent implements OnInit {
  metatype: string = "";
  @Input() offset = 0;
  @Input() index = 0;
  @Input() chapter = 0;
  @Input() item: Page | Content = { metatype: "", content: [] };
  @Input() workshopId: string | null = "";
  response$: Observable<WorkbookResponse> = of();
  saving$: Observable<boolean> | null = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.item.metatype === "textarea") {
      this.item = this.item as Paragraph;
      // this.response$ = this.workshopService.getWorkbookResponse$(this.item.content[0] as string).pipe(
      //   concatMap(responses => {
      //     if (responses.length > 0) {
      //       return of(responses[0])
      //     } else {
      //       const response = Object.assign({}, DEFAULT_WORKBOOK_RESPONSE);
      //       response.inputId = this.item.content[0] as string;
      //       response.chapter = this.index;
      //       response.page = this.offset + this.index
      //       return this.workshopService.getUser$().pipe(
      //         map(user => {
      //           response.userEmail = user.email!;
      //           response.userId = user.uid;
      //           return response
      //         })
      //       )
      //     }
      //   }),
      // );
    }
  }

  itemAsStrings(): string[] {
    return this.item.content as unknown as string[];
  }

  itemAsContent(): Content[] {
    return this.item.content as Content[];
  }

  itemAsTables(): Table[] {
    return this.item.content as Table[];
  }

  itemAsSectionItems(): Section[] {
    return this.item.content as Section[];
  }

  itemAsMetatype(): MetaType[] {
    return (this.item as Section).content as MetaType[];
  }

  imageItemAsStrings(index: number): string[] {
    return (this.item.content[index] as SectionItem).content as string[];
  }

  appendixImageAsStrings(appendix: MetaType, index: number): string[] {
    return appendix.content[index].content;
  }

  itemAsTable = () => {
    return this.item as Table
  }

  getSubheadingId(subheading: string): string {
    return subheading.replace(/[^\w\s]/g, '').replace(/\s/g, "-").toLowerCase();
  }

  onTextChange = (text: string) => {
    if (this.saving$ !== null) this.saving$ = null;
    return text;
  }

  saveInput = (response: WorkbookResponse) => {
    response.chapter = this.chapter;
    response.page = this.offset + this.index;
    // this.saving$ = this.workshopService.setWorkbookResponse$(
    //   response, this.workshopId ? this.workshopId : ""
    // ).pipe(
    //   map(_v => true)
    // );
  }
}
