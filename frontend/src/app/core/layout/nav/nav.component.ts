import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  isMobileMenuOpen = false;
  isServicesDropdownOpen = false;
  isScrolled = false;

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit() {
    // Close mobile menu on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMobileMenu();
      }
    });

    // Add scroll listener
    this.addScrollListener();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
    
    // Add/remove scrolled class to nav
    const nav = this.el.nativeElement.querySelector('nav');
    if (this.isScrolled) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    
    // Close mobile menu if clicking outside
    if (!target.closest('#mobile-menu') && !target.closest('#mobile-menu-button')) {
      this.closeMobileMenu();
    }
    
    // Close services dropdown if clicking outside
    if (!target.closest('.relative') || !target.closest('button')) {
      this.closeServicesDropdown();
    }
  }

  toggleServicesDropdown() {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
  }

  closeServicesDropdown() {
    this.isServicesDropdownOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const mobileMenu = this.el.nativeElement.querySelector('#mobile-menu');
    
    if (this.isMobileMenuOpen) {
      mobileMenu.classList.remove('hidden');
      // Add animation class
      setTimeout(() => {
        mobileMenu.classList.add('animate-slide-down');
      }, 10);
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('animate-slide-down');
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    const mobileMenu = this.el.nativeElement.querySelector('#mobile-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('animate-slide-down');
    }
  }

  toggleMobileServicesDropdown() {
    const dropdown = this.el.nativeElement.querySelector('#mobile-services-dropdown');
    const button = this.el.nativeElement.querySelector('#mobile-services-button svg');
    
    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      button.classList.add('rotate-180');
    } else {
      dropdown.classList.add('hidden');
      button.classList.remove('rotate-180');
    }
  }

  private addScrollListener() {
    // Initial check
    this.onWindowScroll();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  // Utility method to check if current route is active
  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }

  // Method to navigate and close menu
  navigateAndClose(route: string) {
    this.router.navigate([route]);
    this.closeMobileMenu();
  }

  goToProductsPage() {
    this.router.navigate(['/products']);
  }
}
