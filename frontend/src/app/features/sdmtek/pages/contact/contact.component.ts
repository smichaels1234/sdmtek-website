import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contacts';

declare global {
  interface Window {
    grecaptcha?: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  captchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  submitting = false;
  submitSuccess = false;
  submitError: string | null = null;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.loadRecaptchaScript();
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactsService.getAllContacts().subscribe({
      next: (contacts: Contact[]) => {
        console.log('Retrieved contacts:', contacts);
      },
      error: (error) => {
        console.error('Error retrieving contacts:', error);
      }
    });
  }

  private loadRecaptchaScript() {
    const scriptId = 'google-recaptcha-script';
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

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
    const captchaToken = window.grecaptcha?.getResponse() || (formData.get('g-recaptcha-response') as string) || '';
    
    // Get submit button
    const submitButton = form.querySelector('.submit-button') as HTMLButtonElement;
    
    // Add loading state
    this.submitting = true;
    this.submitSuccess = false;
    this.submitError = null;
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    if (!captchaToken) {
      this.submitting = false;
      this.submitError = 'Please complete the CAPTCHA before submitting.';
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      return;
    }
    
    // Create contact object from form data
    const contact: Contact = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      budget: formData.get('budget') as string,
      message: formData.get('message') as string,
      termsOfService: formData.get('termsOfService') === 'on',
      captchaToken
    };
    
    console.log('Submitting contact:', contact);
    
    // Submit to API
    this.contactsService.createContact(contact).subscribe({
      next: () => {
        this.submitting = false;
        this.submitSuccess = true;
        this.submitError = null;
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        form.reset();
        window.grecaptcha?.reset();
        setTimeout(() => { this.submitSuccess = false; }, 8000);
      },
      error: (error) => {
        console.error('Error submitting contact:', error);
        this.submitting = false;

        const serverMessage = typeof error?.error === 'string'
          ? error.error
          : error?.error?.detail || error?.error?.title || null;

        this.submitError = error?.status === 0
          ? 'Unable to reach the server. Please check your connection and try again.'
          : (serverMessage || 'Something went wrong while sending your message. Please try again.');

        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        window.grecaptcha?.reset();
      }
    });
  }


}
