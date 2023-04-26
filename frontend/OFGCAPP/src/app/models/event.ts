export class Event {
  name: string;
  description: string;
  date: string;
  category: string;
  musician_id: string;
  link: string;
  status: string;
  image?: Blob;

  constructor(name: string, description: string, date: string, category: string, musician_id: string, link: string, status: string) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.category = category;
    this.musician_id = musician_id;
    this.link = link;
    this.status = status;
  }
}