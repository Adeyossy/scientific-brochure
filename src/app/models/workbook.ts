export type Workbook = Array<Chapter>;

export type TableOfContent = {
  title: string;
  sections: string[];
}

export type Paragraph = {
  metatype: string;
  content: string[];
}

export type MetaType = {
  metatype: string;
  content: Paragraph[];
}

export type Section = {
  metatype: string;
  content: (Paragraph | MetaType)[];
}

export type SectionItem = {
  metatype: string;
  content: (Paragraph | string)[];
}

export type ContentType = Paragraph | MetaType | Section;

export interface Content {
  metatype: string;
  content: (string | Paragraph | MetaType | Section)[];
}

export interface Table {
  metatype: string,
  content: MetaType[]
}

export interface Page {
  metatype: string,
  content: Content[]
}

export type Chapter = {
  heading: string,
  subheading: string,
  level_of_access: string,
  pages: Page[]
}

export const DEFAULT_NEW_CHAPTER: Chapter = {
  heading: "",
  subheading: "",
  level_of_access: "",
  pages: []
}

export interface WorkbookResponse {
  id: string, // inputId + page + chapter + workshopId
  inputId: string,
  userId: string,
  userEmail: string,
  workbookId: string,
  workshopId: string,
  chapter: number, // zero based index
  page: number, // zero based index
  answer: string
}
