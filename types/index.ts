export interface LocaleString {
  en: string;
  he: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  role?: LocaleString; // עבור ניסיון תעסוקתי
  degree?: LocaleString; // עבור השכלה
  organization: LocaleString;
  description?: LocaleString;
}

export interface ResumeData {
  experience: TimelineItem[];
  education: TimelineItem[];
}

export interface Project {
  id: string;
  featured: boolean;
  year: number;
  demoUrl?: string;
  category: string;
  title: LocaleString;
  shortDescription: LocaleString;
  fullDescription?: LocaleString;
  technologies: string[];
  links?: {
    github?: string;
    live?: string;
    article?: string;
  };
  media?: {
    thumbnail?: string;
    demoVideo?: string;
  };
}