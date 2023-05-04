export class Piece {
  author_id: string;
  selectedEventIds: number[];
  name: string;
  description: string;

  constructor(author_id: string, selectedEventIds: number[], name: string, description: string) {
    this.author_id = author_id;
    this.selectedEventIds = selectedEventIds;
    this.name = name;
    this.description = description;
  }
}
