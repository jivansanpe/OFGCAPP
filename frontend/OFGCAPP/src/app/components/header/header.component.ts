import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() inApp: string;
  constructor(private router: Router) { }

  ngOnInit() { }
  goToHome() {
    this.router.navigateByUrl("/event-list", { replaceUrl: true });
  }
}
