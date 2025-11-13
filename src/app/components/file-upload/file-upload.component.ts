import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CardComponent } from '../card/card.component'
import { ButtonComponent } from '../button/button.component'
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component'
import { LessonService } from '../../services/lesson.service'

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [ReactiveFormsModule, CardComponent, ButtonComponent, LoadingOverlayComponent],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
    private readonly fb: FormBuilder = inject(FormBuilder)
    private readonly lessonService: LessonService = inject(LessonService)
    private readonly router: Router = inject(Router)

    uploadForm: FormGroup = this.fb.group({
        file: [null, Validators.required]
    })

    selectedFile: File | null = null
    isDragging: boolean = false
    isUploading: boolean = false
    uploadError: string | null = null
    uploadMessage: string = 'Processing your document...'

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement
        if (input.files && input.files.length > 0) {
            this.handleFile(input.files[0])
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault()
        event.stopPropagation()
        this.isDragging = true
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault()
        event.stopPropagation()
        this.isDragging = false
    }

    onDrop(event: DragEvent): void {
        event.preventDefault()
        event.stopPropagation()
        this.isDragging = false

        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            this.handleFile(event.dataTransfer.files[0])
        }
    }

    private handleFile(file: File): void {
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        const validExtensions = ['.pdf', '.docx']

        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()

        if (validTypes.includes(file.type) || validExtensions.includes(fileExtension)) {
            this.selectedFile = file
            this.uploadForm.patchValue({ file })
            this.uploadForm.get('file')?.updateValueAndValidity()
        } else {
            alert('Please upload a PDF or DOCX file only')
        }
    }

    removeFile(): void {
        this.selectedFile = null
        this.uploadForm.patchValue({ file: null })
        this.uploadForm.get('file')?.updateValueAndValidity()
    }

    onSubmit(): void {
        if (this.uploadForm.valid && this.selectedFile && !this.isUploading) {
            this.isUploading = true
            this.uploadError = null
            this.uploadMessage = 'Extracting text from your document...'

            setTimeout(() => {
                this.uploadMessage = 'Analyzing content with AI...'
            }, 3000)

            setTimeout(() => {
                this.uploadMessage = 'Generating your lesson...'
            }, 6000)

            this.lessonService.uploadFile(this.selectedFile).subscribe({
                next: (response) => {
                    console.log('Upload successful:', response)
                    this.uploadMessage = 'Success! Redirecting...'

                    setTimeout(() => {
                        this.isUploading = false
                        this.router.navigate(['/lessons'])
                    }, 1000)
                },
                error: (error) => {
                    console.error('Upload failed:', error)
                    this.isUploading = false
                    this.uploadError = error.error?.error || 'Failed to upload file. Please try again.'
                }
            })
        }
    }
}

