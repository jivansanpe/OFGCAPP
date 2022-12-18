export class Piece {
  name: string;
  description: string;
  date: string;
  category: string;
  musicians?: [];

  constructor(name: string, description: string, date: string, category: string, musicians?: []) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.category = category;
    this.musicians = musicians;
  }
}