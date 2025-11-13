import { Routes } from '@angular/router'
import { LandingComponent } from './components/landing/landing.component'
import { LessonsComponent } from './pages/lessons/lessons.component'
import { CreateLessonComponent } from './pages/create-lesson/create-lesson.component'

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'lessons/new', component: CreateLessonComponent },
  { path: '**', redirectTo: '' }
]
