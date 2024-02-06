import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderbarComponent } from './components/siderbar/siderbar.component';
import { LazyImageComponent } from './components/lazyImage/lazyImage.component';



@NgModule({
  declarations: [
    LazyImageComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LazyImageComponent,
    SiderbarComponent
  ]
})
export class SharedModule { }
