import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CardComponent } from '../card/card.component'
import { ButtonComponent } from '../button/button.component'

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [ReactiveFormsModule, CardComponent, ButtonComponent],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
    private readonly fb: FormBuilder = inject(FormBuilder)

    uploadForm: FormGroup = this.fb.group({
        file: [null, Validators.required]
    })

    selectedFile: File | null = null
    isDragging: boolean = false

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
        if (this.uploadForm.valid && this.selectedFile) {
            console.log('File uploaded:', this.selectedFile)
            // Handle file upload logic here
        }
    }
}

