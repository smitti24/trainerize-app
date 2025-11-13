import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonComponent } from '../../components/button/button.component'
import { CardComponent } from '../../components/card/card.component'

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
  lessons: any[] = [] // TODO: Replace with actual lesson interface

  constructor(private router: Router) {}

  createNewLesson(): void {
    this.router.navigate(['/lessons/new'])
  }
}

