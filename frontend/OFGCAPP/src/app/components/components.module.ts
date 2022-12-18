import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component'
import { HeaderComponent } from './header/header.component'
import { TopPartComponent } from './top-part/top-part.component'
import { CardComponent } from './card/card.component'
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    TopPartComponent,
    CardComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    TopPartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
