import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavComponent } from "./core/layout/nav/nav.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(private seoService: SeoService) {
    // SEO service will automatically update meta tags on route changes
  }

  ngOnInit() {
    initFlowbite();
  }
}
