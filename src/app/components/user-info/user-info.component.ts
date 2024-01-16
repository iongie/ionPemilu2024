import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Input() paramId: string = "";
  dapil: string | null = null;
  tingkatan: string | null = null;
  constructor(
    private userServ: UserService,
  ) { }

  ngOnInit() {
    this.userServ.getUser.subscribe(user => {
      const mapping = {
        "1": "DPR RI",
        "2": "DPD",
        "3": "DPRD",
        "4": "DPRD PROVINSI"
      };

      const selectedValue = mapping[this.paramId as keyof typeof mapping] || '-';
      this.tingkatan = user.jenis_dapil.includes(selectedValue) ? selectedValue : '-';
      const key = user.dapil.findIndex((element: any) => element === selectedValue);
      // this.dapil = key !== -1 ? user.dapil[key] : '-';
      this.dapil = this.tingkatan !== '-' ? user.dapil : '-';
      console.log(selectedValue, user, key, this.tingkatan);
      
    })
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
