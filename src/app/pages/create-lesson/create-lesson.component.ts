import { Component } from '@angular/core'
import { FileUploadComponent } from '../../components/file-upload/file-upload.component'

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [FileUploadComponent],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export class CreateLessonComponent {}

