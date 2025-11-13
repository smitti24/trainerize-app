import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private readonly router: Router = inject(Router)

  onGetStarted(): void {
    this.router.navigate(['/lessons'])
  }
}

