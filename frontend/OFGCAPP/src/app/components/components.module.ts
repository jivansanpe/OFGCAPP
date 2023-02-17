import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component'
import { HeaderComponent } from './header/header.component'
import { TopPartComponent } from './top-part/top-part.component'
import { CardComponent } from './card/card.component'
import { IonicModule } from '@ionic/angular';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    TopPartComponent,
    CardComponent,
    TabComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    TopPartComponent,
    CardComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
