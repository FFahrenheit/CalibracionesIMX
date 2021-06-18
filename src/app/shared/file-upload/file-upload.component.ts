import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() public type = 'file';
  @Input() public maxSize = 1024*1024*10;
  @Input() public maxFiles = 10;

  @Output() public receive = new EventEmitter<any>();

  files: File[] = [];
  skipped = [];

  constructor() { }

  ngOnInit() {
  }

  addFile($event) {
    let fileList = $event.target.files;
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList.item(i);
      console.log(file);
      if (file.size > this.maxSize) 
      {
        this.skipped.push({
          name: file.name,
          reason: 'Size limit exceeded'
        });
      }
      else if (this.repeatedFilename(file.name)) 
      {
        this.skipped.push({
          name: file.name,
          reason: 'Repeated filename'
        });
      }
      else if(this.files.length >= this.maxFiles)
      {
        this.skipped.push({
          name: file.name,
          reason: 'File limit exceeded'
        });
      }
      else
      {
        this.files.push(fileList.item(i));
      }
    }
    this.receive.emit(this.files);
  }

  private repeatedFilename(name) {
    let repeated = false;
    this.files.forEach(file => {
      if (file.name == name) {
        repeated = true;
      }
    });
    return repeated;
  }

  clearFile(index: number) {
    this.files.splice(index, 1);
    this.receive.emit(this.files);
  }

  deleteSkip(index : number){
    this.skipped.splice(index, 1);
  }
}
