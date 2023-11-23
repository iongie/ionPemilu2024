import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subject, from, switchMap, takeUntil, tap, timer } from 'rxjs';
import { Vote, VoteCaleg, defaultVote, defaultVoteCaleg } from 'src/app/app.interface';
import { CallApiService } from 'src/app/services/callApi/call-api.service';
import { MessageResponseService } from 'src/app/services/messageResponse/message-response.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-form-vote',
  templateUrl: './form-vote.component.html',
  styleUrls: ['./form-vote.component.scss'],
})
export class FormVoteComponent  implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  @Input() voteCaleg: VoteCaleg = defaultVoteCaleg;
  @Input() updateVote: boolean = false;
  @Input() voteCalegId: number | null = null;
  voteCalegForm!: FormGroup;
  upload_bukti_camera: any;
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private callApi: CallApiService,
    private token: TokenService,
    private messageResponse: MessageResponseService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.voteCalegForm = this.fb.group({
      id_caleg: [this.voteCaleg.id_caleg, [Validators.required]],
      no_tps: [{ value: this.voteCaleg.no_tps, disabled: false }, [Validators.required]],
      total_suara: [this.voteCaleg.total_suara, [Validators.required]],
      file_bukti: [null, [Validators.required]]
    }) 

    this.updateVote 
      ? this.voteCalegForm.get('no_tps')?.disable()
      : this.voteCalegForm.get('id_caleg')?.setValue(this.voteCalegId)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  get noTps() {
    return this.voteCalegForm.get('no_tps')!;
  }

  get noTpsRequest() {
    return this.noTps.hasError('required') && this.noTps.touched;
  }

  get totalSuara() {
    return this.voteCalegForm.get('total_suara')!;
  }

  get totalSuaraRequest() {
    return this.totalSuara.errors?.['required'] && this.totalSuara.touched;
  }

  getFileFromBase64(base64: string, fileName: string) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    const myBlob = new Blob([byteArray], { type: 'image/png' });
    const uniqueFileName = Date.now() + '_' + fileName;
    return new File([myBlob], uniqueFileName, { lastModified: new Date().getTime(), type: 'image/png' });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    let imageUrl = await image.dataUrl;
    this.upload_bukti_camera = await imageUrl;
    this.voteCalegForm.patchValue({
      file_bukti: this.getFileFromBase64(this.upload_bukti_camera, 'file_bukti.png')
    })
  }

  cancelPolling(){
    console.log(this.voteCalegForm.value);
    this.updateVote = false;
    this.modalCtrl.dismiss(this.voteCaleg, 'confirm');
    this.voteCalegForm.reset(defaultVoteCaleg)
    this.voteCalegForm.get('no_tps')?.enable()
  }

  simpanPolling() {
    const voteFormData = new FormData()
    voteFormData.append('id_caleg', this.voteCalegForm.get('id_caleg')?.value)
    voteFormData.append('no_tps', this.voteCalegForm.get('no_tps')?.value)
    voteFormData.append('total_suara', this.voteCalegForm.get('total_suara')?.value)
    voteFormData.append('file_bukti', this.voteCalegForm.get('file_bukti')?.value)
    this.voteCalegForm.valid
      && from(this.loadingCtrl.create({
        message: 'loading...',
        duration: 100,
      })).pipe(
        tap((loading) => loading.present()),
        tap(() => timer(1000)),
        switchMap(() => this.token.getToken),
        switchMap((token) => this.callApi.post(voteFormData, 'vote-caleg', token)),
        tap(() => this.modalCtrl.dismiss('added')),
        tap(() => this.upload_bukti_camera = undefined),
        tap(() => this.voteCalegForm.reset(defaultVoteCaleg)),
        takeUntil(this.destroy),
      ).subscribe(
        {
          next: (res: any) => (
            this.messageResponse.toastMode(res.message, 3000, 'top', 'header', 'success')
          ),
          error: (e) => (
            this.messageResponse.toastMode(e.error.message, 3000, 'top', 'header', 'error')
          )
        }
      )
  }

  updatePolling() {
    const updateVoteFormData = new FormData()
    updateVoteFormData.append('total_suara', this.voteCalegForm.get('total_suara')?.value)
    updateVoteFormData.append('file_bukti', this.voteCalegForm.get('file_bukti')?.value)
    this.voteCalegForm.valid
      && from(this.loadingCtrl.create({
        message: 'loading...',
        duration: 100,
      })).pipe(
        tap((loading) => loading.present()),
        tap(() => timer(1000)),
        switchMap(() => this.token.getToken),
        switchMap((token) => this.callApi.post(updateVoteFormData, `update-vote-caleg/${this.voteCalegId}`, token)),
        tap(() => this.modalCtrl.dismiss('update')),
        tap(() => this.upload_bukti_camera = undefined),
        tap(() => this.voteCalegForm.reset(defaultVoteCaleg)),
        tap(() => this.voteCalegForm.get('no_tps')?.enable()),
        tap(() => this.updateVote = false),
        takeUntil(this.destroy),
      ).subscribe(
        {
          next: (res: any) => (
            this.messageResponse.toastMode(res.message, 3000, 'top', 'header', 'success')
          ),
          error: (e) => (
            this.messageResponse.toastMode(e.error.message, 3000, 'top', 'header', 'error')
          )
        }
      )
  }


  actionPolling(){
    this.updateVote ? this.updatePolling() : this.simpanPolling()
  }

}
