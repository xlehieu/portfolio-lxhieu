import { Component, signal } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
@Component({
  selector: 'app-my-love',
  imports: [NgxMasonryModule],
  templateUrl: './my-love.html',
  styles: [
    `
      /* Nếu bạn muốn 3 cột trên màn hình lớn */
      .masonry-item {
        width: calc(33.33% - 10px); /* 10px là trừ đi phần gutter */
        margin-bottom: 10px;
      }

      /* Responsive cho điện thoại (1 cột) */
      @media (max-width: 640px) {
        .masonry-item {
          width: 100%;
        }
      }
    `,
  ],
})
export class MyLove {
  MYLOVE_IMGS = signal<string[]>([]);
  ngOnInit(): void {
    this.MYLOVE_IMGS.set([
      'https://res.cloudinary.com/dz3hnhp6i/image/upload/v1777369007/20561725381111382605_evfmde.jpg',
      'https://res.cloudinary.com/dz3hnhp6i/image/upload/v1777369007/20273461368777717427_ufwcso.jpg',
      'https://res.cloudinary.com/dz3hnhp6i/image/upload/v1777369008/30164910748926051511_wjfxxt.jpg',
      'https://res.cloudinary.com/dz3hnhp6i/image/upload/v1777369008/1003522866121420259_shgo4w.jpg',
      'https://res.cloudinary.com/dz3hnhp6i/image/upload/v1777369007/288343194716899670310_xhfvdz.jpg',
    ]);
  }
}
