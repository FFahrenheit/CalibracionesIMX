import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDeviceService } from 'src/app/services/update-device.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-confirm-calibration',
  templateUrl: './confirm-calibration.component.html',
  styleUrls: ['./confirm-calibration.component.scss']
})
export class ConfirmCalibrationComponent implements OnInit {

  public id: string | null = '';
  public show = false;
  public device = null;
  public form: FormGroup = Object.create(null);
  public reasons: string[];
  public ryr: File;
  public certificate: File;

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
      fecha: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      calibrador: [''],
      hasRyr: [false],
      hasCertificate: [false],
      ryr: [''],
      certificate: [''],
    });
  }

  ryrEvent($event) {
    if ($event.target.files.length > 0) {
      this.ryr = $event.target.files[0];
    }
  }

  certificateEvent($event) {
    if ($event.target.files.length > 0) {
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
            this.status.uploadRyr(this.id, this.ryr)
              .subscribe(resp => {
                if (resp['ok']) {
                  myCount += 1;
                  if (myCount == fileCount) {
                    this.navigate();
                  }
                } else {
                  this.alert.error('No se pudo subir el RYR');
                }
              }, error => {
                this.alert.error('Error al subir RYR');
              });
          }
          if (this.form.controls['hasCertificate'].value) {

            //UPLOAD CERTIFICATE
            this.status.uploadCertificate(this.id, this.certificate)
              .subscribe(resp => {
                if (resp['ok']) {
                  myCount += 1;
                  if (myCount == fileCount) {
                    this.navigate();
                  }
                } else {
                  this.alert.error('No se pudo subir el certificado');
                }
              }, error => {
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
    this.alert.success('Calibración confirmada');
    setTimeout(() => {
      this.router.navigate(['equipos', 'detalles', this.id]);
    }, 2500);
  }

  goDown() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1);
  }

  public getClass(ctrl: string): string {
    if (!this.form.controls[ctrl].touched) {
      return '';
    }
    return this.form.controls[ctrl].valid ? 'is-valid' : 'is-invalid';
  }

  public isValid() : boolean {
    this.reasons = [];
    let status = true;
    if (this.get('fecha').invalid) {
      status = false;
      this.reasons.push('Agregue la fecha de calibrado');
    }
    if (this.get('hasRyr').value && this.get('ryr').value == '') {
      status = false;
      this.reasons.push('No se ha adjuntado el archivo RYR');
    }
    if (this.get('hasCertificate').value && this.get('certificate').value == '') {
      this.reasons.push('No se ha adjuntado el certificado de calibración o validación interna');
      status = false;
    }
    return status;
  }

  public get(ctrl: string): AbstractControl {
    return this.form.controls[ctrl];
  }

  public isDummy(): boolean {
    return this.device?.id.startsWith('DUM-');
  }

  public checkValidity() {
    this.form.markAllAsTouched();
  }

}
