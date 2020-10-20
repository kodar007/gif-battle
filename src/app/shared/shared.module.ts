import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifComponent } from './gif/gif.component';



@NgModule({
  declarations: [GifComponent],
  exports: [GifComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
