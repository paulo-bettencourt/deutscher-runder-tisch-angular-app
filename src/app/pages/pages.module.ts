import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {QuillModule} from "ngx-quill";
import {NgxDropzoneModule} from "ngx-dropzone";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {ClassroomComponent} from "./classroom/list/classroom.component";
import {LoginComponent} from "./login/login.component";
import {OtpComponent} from "./otp/otp.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AddClassComponent} from "./crud-class/add/add-class.component";
import {DeleteClassDialog} from "./crud-class/delete/delete-class.component";
import {EditClassDialog} from "./crud-class/edit/edit-class-dialog.component";
import {ImageDialog} from "./classroom/image-dialog/image-dialog.component";



@NgModule({
  declarations: [
    ClassroomComponent,
    LoginComponent,
    OtpComponent,
    SignUpComponent,
    AddClassComponent,
    DeleteClassDialog,
    EditClassDialog,
    ImageDialog
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    QuillModule,
    NgxDropzoneModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    QuillModule.forRoot()
  ]
})
export class PagesModule { }