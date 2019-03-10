export interface HashMap<T> {
  [propname: string]: T;
}

export interface IOneSlide {
  control: string;
  props: HashMap<any>;
  next: any;
}

export interface ISlides<IOneSlide> {
  [propname: string]: IOneSlide
}

export interface IPresentation {
  currentSlide: string;
  slides: number;
}
