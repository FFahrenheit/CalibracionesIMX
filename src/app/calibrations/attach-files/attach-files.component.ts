import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDeviceService } from 'src/app/services/update-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-attach-files',
  templateUrl: './attach-files.component.html',
  styleUrls: ['./attach-files.component.scss']
})
export class AttachFilesComponent implements OnInit {

  public id: string | null = '';
  public show = false;
  public device = null;
  public form: FormGroup = Object.create(null);
  public reasons: string[];
  public ryr : File | string;
  public certificate : File | string;
  public model = null;
  public ryrName : string;
  public certificateName : string;

  constructor(private route: ActivatedRoute,
    private status: UpdateDeviceService,
    private alert: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.form = this.fb.group({
      calibracion: ['', Validators.required],
      verifico: [{
        value: '',
        disabled: true
      }],
      fecha: [{
        value: '',
        disabled: true
      }],
      calibrador: [{
        value: '',
        disabled: true
      }],
      hasRyr: [false],
      hasCertificate: [false],
      ryr: [''],
      certificate: [''],
    });
  }

  ryrEvent($event){
    if($event.target.files.length > 0) {
      this.ryr = $event.target.files[0];
    }
  }

  certificateEvent($event){
    if($event.target.files.length > 0) {
      this.certificate = $event.target.files[0]
    }
  }

  exists($event) {
    this.show = $event != null;
    this.device = $event;
  }

  confirmCalibration() {

    let calibrador;
    if (this.device.calibracion == 'INTERNO') {
      calibrador = 'Interplex';
    } else if (this.form.controls['calibrador'].value != '') {
      calibrador = this.form.controls['calibrador'].value;
    } else {
      calibrador = 'N/I';
    }

    let fileCount = this.form.controls['hasRyr'].value + this.form.controls['hasCertificate'].value;
    console.log('File count : ' + fileCount);
    let myCount = 0;
    this.status.acceptCalibration(this.id, calibrador, new Date(this.form.controls['fecha'].value)).subscribe(
      resp => {
        if (resp) {
          if (this.form.controls['hasRyr'].value) {
            //UPLOAD RYR 
            this.status.uploadRyr(this.id,this.ryr as File)
                  .subscribe(resp=>{
                    if(resp['ok']){
                      myCount += 1;
                      if(myCount == fileCount){
                        this.navigate();
                      }
                    }else{
                      this.alert.error('No se pudo subir el RYR');
                    }
                  },error=>{
                    this.alert.error('Error al subir RYR');
                  });
          }
          if (this.form.controls['hasCertificate'].value) {

            //UPLOAD CERTIFICATE
            this.status.uploadCertificate(this.id,this.certificate as File)
                  .subscribe(resp=>{
                    if(resp['ok']){
                      myCount += 1;
                      if(myCount == fileCount){
                        this.navigate();
                      }
                    }else{
                      this.alert.error('No se pudo subir el certificado');
                    }
                  },error=>{
                    this.alert.error('Error al subir certificado');
                  });

          }
          if (fileCount == 0) {
            this.navigate();
          }

        } else {
          this.alert.error(this.status.geError());
        }
      }, error => {
        this.alert.error(this.status.geError());
      }
    );
  }

  private navigate() {
    this.alert.success('Se han adjuntado los archivos');
    setTimeout(() => {
      this.router.navigate(['equipos', 'detalles', this.id]);
    }, 2500);
  }

  goDown() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  }

  public getClass(ctrl : string) : string{
    if(!this.form.controls[ctrl].touched || this.form.controls[ctrl].status == 'DISABLED'){
      return '';
    }
    return this.form.controls[ctrl].valid ? 'is-valid' : 'is-invalid';
  }

  public isDummy() : boolean{
    return this.device?.id.startsWith('DUM-');
  }

  setModel(){
    let id  = this.form.controls['calibracion'].value;
    let calibracion = this.device.calibraciones.filter(d => d.id == id)[0];
    this.model = calibracion;
    this.model.fecha = this.datePipe.transform(this.model.fecha,'yyyy-MM-dd');
    console.log({ id, calibracion });
    this.updateFiles();
  }

  getModel(ctrl: string){
    let input = this.form.controls[ctrl];
    if(this.model != null){
      input.setValue(this.model[ctrl]);
    }else{
      input.setValue('');
    }
  }

  private updateFiles(){
    if(this.model.certificado != null){
      this.form.controls['hasCertificate'].setValue(true);
      this.certificate = this.model.certificado as string;
      this.certificateName = this.certificate.substring(this.certificate.lastIndexOf("\\") + 1);
      this.form.controls['certificate'].disable();
      this.form.controls['hasCertificate'].disable();
    }else{
      this.form.controls['hasCertificate'].setValue(false);
      this.certificate = null;
      this.certificateName = null;
      this.form.controls['certificate'].enable();
      this.form.controls['hasCertificate'].enable();
    }
    if(this.model.ryr != null){
      this.form.controls['hasRyr'].setValue(true);
      this.ryr = this.model.ryr as string;
      this.ryrName = this.ryr.substring(this.ryr.lastIndexOf("\\") + 1);
      this.form.controls['ryr'].disable();
      this.form.controls['hasRyr'].disable();
    }else{
      this.form.controls['hasRyr'].setValue(false);
      this.ryr = null;
      this.ryrName = null;
      this.form.controls['ryr'].enable();
      this.form.controls['hasRyr'].enable();
    }
    this.form.updateValueAndValidity();
  }

  isValid(){
    this.reasons = [];
    if(!this.form.valid){
      console.log(this.form);
      this.reasons.push('Seleccione una calibración');
      return false;
    }
    return true;
    // let status = false;
    // if (!this.form.controls['hasRyr'].value && !this.form.controls['hasCertificate'].value) {
    //   return false;
    // }
    // if (this.form.controls['hasCertificate'].value && this.form.controls['certificate'].value == '') {
    //   this.reasons.push('No se ha adjuntado el certificado de calibración');
    //   status = true;
    // }
    // // console.log([this.form.controls['hasCertificate'].value, this.form.controls['certificate'].value == ''])
    // if (this.form.controls['hasRyr'].value && this.form.controls['ryr'].value == '') {
    //   this.reasons.push('No se ha adjuntado el archivo RYR');
    //   status = true;
    // }
    // return status;
  }
}
