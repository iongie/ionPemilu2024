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

  async ngOnInit() {
    console.log(this.suaraPartai);
  }

}
