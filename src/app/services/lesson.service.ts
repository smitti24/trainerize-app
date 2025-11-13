import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../environments/environment'

export interface UploadResponse {
    success: boolean
    message: string
    extractedWordCount: number
    data: {
        ingestion: any
        themes: any[]
        lesson: any
        citations: any[]
    }
}

@Injectable({
    providedIn: 'root'
})
export class LessonService {
    private readonly http: HttpClient = inject(HttpClient)
    private readonly apiUrl: string = environment.apiUrl

    uploadFile(file: File): Observable<UploadResponse> {
        const formData: FormData = new FormData()
        formData.append('file', file)

        return this.http.post<UploadResponse>(
            `${this.apiUrl}/ingestion/upload`,
            formData
        )
    }

    getAllLessons(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/ingestion`)
    }

    getLessonById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/ingestion/${id}`)
    }
}

