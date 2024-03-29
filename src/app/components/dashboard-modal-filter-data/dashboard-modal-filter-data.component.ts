import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, combineLatest, switchMap, takeUntil } from 'rxjs';
import { DashFilterData, Kecamatan, Kelurahan, Kota, Provinsi, defaultDashFilterData, defaultKecamatan, defaultKelurahan, defaultKota, defaultProvinsi } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { DashboardFilterDataService } from 'src/app/services/dashboard-filter-data/dashboard-filter-data.service';
import { DataProvinsiService } from 'src/app/services/data-provinsi/data-provinsi.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-dashboard-modal-filter-data',
  templateUrl: './dashboard-modal-filter-data.component.html',
  styleUrls: ['./dashboard-modal-filter-data.component.scss'],
})
export class DashboardModalFilterDataComponent implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  customProvinsiOptions = {
    header: 'Provinsi',
    subHeader: 'Pilih Provinsi',
    translucent: true,
  };

  customKotaOptions = {
    header: 'Kota',
    subHeader: 'Pilih Kota',
    translucent: true,
  };

  customKecamatanOptions = {
    header: 'Kecamatan',
    subHeader: 'Pilih Kecamatan',
    translucent: true,
  };

  customKelurahanOptions = {
    header: 'Kelurahan',
    subHeader: 'Pilih Kelurahan',
    translucent: true,
  };

  provinsi: Provinsi[] = defaultProvinsi;
  kota: Kota[] = defaultKota;
  kecamatan: Kecamatan[] = defaultKecamatan;
  kelurahan: Kelurahan[] = defaultKelurahan;
  dataFilter: DashFilterData = defaultDashFilterData;
  @Output() filter = new EventEmitter<DashFilterData>();
  @Output() reset = new EventEmitter<DashFilterData>();
  @Input() tingkatan: string = '';
  compareProvres: boolean = false;
  constructor(
    private callApiServ: CallApiService,
    private token: TokenService,
    private dataProvinsiServ: DataProvinsiService,
    private dashboardFilterDataServ: DashboardFilterDataService,
  ) { }

  ngOnInit() {
    this.getProvinsi();
    this.setDefaultValues();
    this.getDataFilter();
    this.dataFilter.provinsi == '36' && this.getKota(this.dataFilter.provinsi)
    this.dataFilter.kota == '3674' && this.getKecamatan()
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete()
  }

  async setDefaultValues() {
    // this.dataFilter.provinsi = '36';
    // this.dataFilter.kota = '3674';
    // this.dataFilter.provinsi = this.tingkatan === "Presiden" || this.tingkatan === "DPR" ? '' : '36';
    // this.dataFilter.kota = this.tingkatan === "Presiden" || this.tingkatan === "DPR" || this.tingkatan === "DPRD PROVINSI" ? '' : '3674';
  }

  getDataFilter(){
    this.dashboardFilterDataServ.getFilterData
    .pipe(takeUntil(this.destroy))
    .subscribe(res=> {
      this.dataFilter = res
    });
  }

  getProvinsi() {
    combineLatest([
      this.token.getToken,
      this.dataProvinsiServ.getProvinsi
    ]).pipe(
      switchMap(([token, prov]) => this.callApiServ.get('provinsi-list', token)),
      takeUntil(this.destroy)
    ).subscribe(
      {
        next: (res: any) => (
          this.provinsi = res.data
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  onProvinsiChange(event: any) {
    this.dataFilter = {
      provinsi: event.detail.value,
      kota: "",
      kec: "",
      kel: ""
    }
    this.kota = defaultKota;
    this.kecamatan = defaultKecamatan;
    this.kelurahan = defaultKelurahan;
    this.getKota(this.dataFilter.provinsi!);
  }


  getKota(provId: string) {
    combineLatest([
      this.token.getToken,
      this.dataProvinsiServ.getProvinsi
    ]).pipe(
      switchMap(([token, prov]) => this.callApiServ.get(`kota-list/${provId}`, token)),
      takeUntil(this.destroy)
    ).subscribe(
      {
        next: (res: any) => (
          this.kota = res.data
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  onKotaChange(event: any) {
    this.dataFilter = {
      provinsi: this.dataFilter.provinsi,
      kota: event.detail.value,
      kec: "",
      kel: ""
    }
    this.kecamatan = defaultKecamatan;
    this.kelurahan = defaultKelurahan;
    this.dataFilter.kota?.length !== 0 && this.getKecamatan();
    
  }

  getKecamatan() {
    combineLatest([
      this.token.getToken,
      this.dataProvinsiServ.getProvinsi
    ]).pipe(
      switchMap(([token, prov]) => this.callApiServ.get(`kecamatan-list/${this.dataFilter.kota}`, token)),
      takeUntil(this.destroy)
    ).subscribe(
      {
        next: (res: any) => (
          this.kecamatan = res.data
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  onKecChange(event: any) {
    this.dataFilter = {
      provinsi: this.dataFilter.provinsi,
      kota: this.dataFilter.kota,
      kec: event.detail.value,
      kel: ""
    }
    this.kelurahan = defaultKelurahan;
    this.dataFilter.kec?.length !== 0 &&  this.getKelurahan();
  }

  getKelurahan() {
    combineLatest([
      this.token.getToken,
      this.dataProvinsiServ.getProvinsi
    ]).pipe(
      switchMap(([token, prov]) => this.callApiServ.get(`kelurahan-list/${this.dataFilter.kec}`, token)),
      takeUntil(this.destroy)
    ).subscribe(
      {
        next: (res: any) => (
          this.kelurahan = res.data
        ),
        error: (e: any) => (
          console.log(e)
        )
      }
    )
  }

  onKelChange(event: any) {
    this.dataFilter.kel = event.detail.value;
    this.dataFilter = {
      provinsi: this.dataFilter.provinsi,
      kota: this.dataFilter.kota,
      kec: this.dataFilter.kec,
      kel: event.detail.value
    }
  }

  filterData() {
    this.dashboardFilterDataServ.updateFilterData(this.dataFilter);
    this.filter.emit(this.dataFilter)
  }

  resetData() {
    this.dataFilter = {
      provinsi: this.tingkatan ==="Presiden"? "": "36",
      kota: this.tingkatan ==="Presiden"? "": "3674",
      kec: "",
      kel: ""
    }
    this.dashboardFilterDataServ.updateFilterData(this.dataFilter);
    this.reset.emit(this.dataFilter)
  }

  compareWithProvinsifn(o1: any, o2: any) {
    return o1 == o2;
  }

  compareWithKotafn(o1: any, o2: any) {
    return o1 == o2;
  }

}
