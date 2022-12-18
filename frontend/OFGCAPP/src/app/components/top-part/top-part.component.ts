import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-top-part',
  templateUrl: './top-part.component.html',
  styleUrls: ['./top-part.component.scss'],
})
export class TopPartComponent implements OnInit {
  @Input() title: string;
  constructor(private location: Location) { }

  ngOnInit() { }
  back(): void {
    this.location.back();
  }
}
