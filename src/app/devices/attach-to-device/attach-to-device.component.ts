import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tiposReferencia } from 'src/app/resources/resources.types';
import { UploadCertificateService } from 'src/app/services/upload-certificate.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-attach-to-device',
  templateUrl: './attach-to-device.component.html',
  styleUrls: ['./attach-to-device.component.scss']
})
export class AttachToDeviceComponent implements OnInit, AfterViewChecked {

  public id: string | null = '';
  public show = false;
  public device = null;
  public form: FormGroup = Object.create(null);
  public archivo: File;
  public filename: string;
  public tipos = tiposReferencia;

  constructor(private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router,
    private fb: FormBuilder,
    private upload: UploadCertificateService,
    private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.form = this.fb.group({
      tipo: [null, Validators.required],
      tipoCustom: [''],
      archivo: ['', Validators.required]
    });
  }

  public get(ctrl: string) {
    return this.form.controls[ctrl];
  }


  public fileEvent($event) {
    if ($event.target.files.length > 0) {
      this.archivo = $event.target.files[0] as File;
      this.filename = this.archivo.name;
    } else {
      this.archivo = null;
      this.filename = null;
    }
  }

  public exists($event) {
    this.show = $event != null;
    this.device = $event;
  }

  private navigate() {
    this.alert.success('Se ha adjuntado la referencia');
    setTimeout(() => {
      this.router.navigate(['equipos', 'detalles', this.id]);
    }, 2500);
  }

  public getClass(ctrl: string): string {
    if (!this.form.controls[ctrl].touched || this.form.controls[ctrl].disabled) {
      return '';
    }
    return this.form.controls[ctrl].valid ? 'is-valid' : 'is-invalid';
  }

  public setModel() {
    if (this.get('tipo').value == 'custom') {
      console.log('Validator required');
      this.get('tipoCustom').setValidators(Validators.required);
    } else {
      console.log('Reset validators');
      this.get('tipoCustom').clearValidators();
      this.get('tipoCustom').updateValueAndValidity();
      this.form.updateValueAndValidity();
    }
  }

  public isValid() {
    return this.form.valid;
  }


  public submit() {
    if (this.form.valid) {
      this.upload.uploadReference(
        this.id,
        this.get('tipo').value == 'custom' ? this.get('tipoCustom').value : this.get('tipo').value,
        this.archivo
      ).subscribe(resp => {
        if (resp) {
          this.navigate();
        } else {
          this.alert.error(this.upload.getError());
        }
      }, error => {
        this.alert.error(this.upload.getError());
      })
    }
  }
}
