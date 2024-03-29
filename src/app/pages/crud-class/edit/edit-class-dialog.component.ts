import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';

import { AuthService } from '../../../services/auth.service';
import { reduxGermanService } from '../../../services/ngrx-german.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    NgxDropzoneModule,
    MatSnackBarModule,
  ],
  templateUrl: './edit-class-dialog.html',
})
export class EditClassDialog implements AfterViewInit {
  typeOfClass!: any;
  nameOfFile: string = '';
  nameOfImage!: string;
  fileToUpload: File | null = null;
  formAddClass = this.fb.group({
    nameClass: ['', Validators.required],
    textClass: ['', Validators.required],
    imageClass: ['', Validators.required],
  });
  imageResult: string | ArrayBuffer | null | undefined;
  imageToUpload!: any;
  files: File[] = [];
  fileNameUrl!: string;
  classId!: any;
  fileName: any;
  editor: any;
  @ViewChild('editor') editorElement: any;
  @ViewChild('imageUploadDropzone') imageUploadDropzone: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  quillConfiguration = {
    toolbar: [
      ['italic', 'underline'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
    ],
  };
  private objectToUpdate!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private reduxService: reduxGermanService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.formAddClass.controls['nameClass'].setValue(this.data.title);
    this.formAddClass.controls['textClass'].setValue(this.data.text);
    this.formAddClass.controls['imageClass'].setValue(this.data.image);
    this.classId = this.data.id.trim();
    if (this.data.image) {
      this.convertData64ToImage(this.data.image);
    }
    this.downloadFile(this.data.file, this.data.file);
  }

  ngAfterViewInit(): void {
    this.objectToUpdate = {
      _id: this.classId,
      title: this.formAddClass.controls['nameClass'].value,
      text: this.formAddClass.controls['textClass'].value,
      author: JSON.stringify(localStorage.getItem('BringUsername')),
    };
  }

  updateObjectToUpdate() {
    this.dialog.closeAll();

    this.objectToUpdate = {
      _id: this.classId,
      title: this.formAddClass.controls['nameClass'].value,
      text: this.formAddClass.controls['textClass'].value,
      image: this.imageResult,
      author: localStorage.getItem('BringUsername'),
    };
    this.reduxService.update(this.objectToUpdate).subscribe((data) => {
      console.log('Data update:  ', data);
    });
  }

  // Define a function to download the file and convert it to a File object
  downloadFile(url: string, filename: string): void {
    this.http
      .get(url, { responseType: 'blob' })
      .toPromise()
      .then((blob: Blob | undefined) => {
        if (blob) {
          // Create a new File object from the downloaded blob
          return this.createFile(blob, filename);
        } else {
          throw new Error('Unable to download file');
        }
      })
      .then((file: File) => {
        const oldFileUploaded = file;
        this.fileNameUrl = oldFileUploaded.name;
        this.fileName = oldFileUploaded.name.split('/').pop();
        document.documentElement.style.setProperty(
          '--my-var',
          JSON.stringify(this.fileName)
        );
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  createFile(blob: Blob, filename: string): File {
    // Create a new File object from the blob and filename
    return new File([blob], filename, { type: blob.type });
  }

  convertData64ToImage(image64: string) {
    this.imageResult = image64;
    // Get the base64-encoded image from some source (e.g. an API response)
    const base64Image = image64;
    // Extract the data portion of the base64-encoded string
    const data = base64Image.split(',')[1];
    // Decode the base64-encoded data into a binary string
    const binaryString = window.atob(data);
    // Convert the binary string into an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // Create a blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    // Create a new File object from the blob
    this.files[0] = new File([blob], 'image.png', { type: 'image/png' });
  }

  chooseTypeOfClass(type: any) {
    this.typeOfClass = type;
  }

  handleFileInput(files: any) {
    this.nameOfFile = files.target.files[0].name;
    this.fileToUpload = files.target.files[0];
    document.documentElement.style.setProperty(
      '--my-var',
      JSON.stringify(files.target.files[0].name)
    );
  }

  handleImageInput(files: any) {
    const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
    const reader = new FileReader();
    const imageToUpload = files.addedFiles[0];

    if (imageToUpload.size > MAX_IMAGE_SIZE) {
      // If the image is too large, show an error message and don't process it
      this.snackBar.open(
        "Images can't be over 1MB. Please upload a smaller file",
        undefined,
        {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        }
      );
      return;
    }

    // Store the selected image and display a preview
    this.imageToUpload = imageToUpload;
    this.files[0] = this.imageToUpload;
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = () => (this.imageResult = reader.result);
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  cancelUpdate() {
    this.dialog.closeAll();
  }
}
