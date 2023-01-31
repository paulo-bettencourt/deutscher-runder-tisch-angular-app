import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './component/classroom/classroom.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ClassroomComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ClassroomModule { }
