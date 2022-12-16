export class Piece {
  author_id: string;
  event_id: string;
  name: string;
  description: string;

  constructor(author_id: string, event_id: string, name: string, description: string) {
    this.author_id = author_id;
    this.event_id = event_id;
    this.name = name;
    this.description = description;
  }
}
