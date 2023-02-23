import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component'
import { HeaderComponent } from './header/header.component'
import { TopPartComponent } from './top-part/top-part.component'
import { CardComponent } from './card/card.component'
import { FormComponent } from './form/form.component'
import { IonicModule } from '@ionic/angular';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    TopPartComponent,
    CardComponent,
    TabComponent,
    FormComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    TopPartComponent,
    CardComponent,
    TabComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
