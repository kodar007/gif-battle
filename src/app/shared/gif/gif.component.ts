import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gif',
  template: `
    <div class="gif-container">
      <!-- image -->
      <img [src]="url">

      <!-- caption -->
      <div class="caption"> {{caption}}</div>
    </div>

  `,
  styles: [`
    .gif-container {
      position: relative;
    }

    .caption {
      display: block;
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 40px;
      text-align: center;
      color: #FFF;
      font-size: 30px;
      text-transform: uppercase;
      line-height: 1;
      word-break: break-all;
      text-shadow: 1px 1px 3px #000;
    }

  `]
})
export class GifComponent implements OnInit {
  @Input() url;
  @Input() caption;

  constructor() { }

  ngOnInit(): void {
  }

}
