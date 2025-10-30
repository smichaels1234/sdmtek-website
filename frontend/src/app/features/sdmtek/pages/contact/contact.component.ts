import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  scrollToForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleFAQ(event: Event) {
    const button = event.currentTarget as HTMLElement;
    const answer = button.nextElementSibling as HTMLElement;
    const isOpen = answer.classList.contains('open');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-answer.open').forEach(item => {
      item.classList.remove('open');
    });
    
    document.querySelectorAll('.faq-question.active').forEach(item => {
      item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isOpen) {
      answer.classList.add('open');
      button.classList.add('active');
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Get submit button
    const submitButton = form.querySelector('.submit-button') as HTMLButtonElement;
    
    // Add loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Remove loading state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      
      // Show success message
      this.showSuccessMessage();
      
      // Reset form
      form.reset();
    }, 2000);
  }

  private showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message show';
    successMessage.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Thank you for your message! We'll get back to you within 24 hours.
      </div>
    `;
    
    // Insert at the top of the form
    const form = document.querySelector('.contact-form');
    if (form) {
      form.insertBefore(successMessage, form.firstChild);
      
      // Remove after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  }
}
