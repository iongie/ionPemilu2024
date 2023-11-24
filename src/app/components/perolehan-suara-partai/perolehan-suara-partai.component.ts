import { Component, OnInit, Input } from '@angular/core';
import { TotalSuaraPartai } from 'src/app/app.interface';

@Component({
  selector: 'app-perolehan-suara-partai',
  templateUrl: './perolehan-suara-partai.component.html',
  styleUrls: ['./perolehan-suara-partai.component.scss'],
})
export class PerolehanSuaraPartaiComponent  implements OnInit {
  @Input() suaraPartai: TotalSuaraPartai[] = []
  constructor() { }

  ngOnInit() {
    this.suaraPartai = this.suaraPartai.map((element) => {
      if (element.logo_partai !== null) {
        if (element.logo_partai.startsWith('v')) {
          element.logo_partai = element.logo_partai.slice(1); // Mengubah properti name menjadi 'host'
        }
      }
      return element;
    });
  }

}
