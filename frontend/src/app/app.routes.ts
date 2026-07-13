import { Routes } from '@angular/router';
import { LoginComponent } from './features/sdmtek/pages/login/login.component';
import { HomeComponent } from './features/sdmtek/pages/home/home.component';
import { ServicesComponent } from './features/sdmtek/pages/services/services.component';
import { AboutComponent } from './features/sdmtek/pages/about/about.component';
import { ContactComponent } from './features/sdmtek/pages/contact/contact.component';
import { WebDevelopmentComponent } from './features/sdmtek/pages/services/web-development/web-development.component';
import { DigitalMarketingComponent } from './features/sdmtek/pages/services/digital-marketing/digital-marketing.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        data: {
            seo: {
                title: 'SDMTek - Expert Software Engineering & Digital Marketing Solutions',
                description: 'Transform your business with SDMTek\'s expert software engineering and digital marketing services. 500+ successful projects, 15+ years experience. Custom web development, mobile apps, SEO, and cloud solutions.',
                keywords: 'software engineering, digital marketing, web development, mobile apps, SEO, digital transformation, technology consulting, custom software development'
            }
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            seo: {
                title: 'Client Login | SDMTek',
                description: 'Secure client login for SDMTek services.',
                keywords: 'sdmtek login, client portal'
            },
            noIndex: true
        }
    },
    {
        path: 'services',
        component: ServicesComponent,
        data: {
            seo: {
                title: 'Our Services - Software Development & Digital Marketing | SDMTek',
                description: 'Explore SDMTek services: custom web development, mobile app development, SEO optimization, cloud solutions, and UI/UX design tailored to your business goals.',
                keywords: 'web development services, mobile app development, digital marketing agency, SEO services, cloud computing, UI UX design, technology consulting'
            }
        }
    },
    {
        path: 'web-development', component: WebDevelopmentComponent,
        data: {
            seo: {
                title: 'Web Development Services | SDMTek',
                description: 'Discover SDMTek\'s web development services, including custom websites, web applications, and responsive design solutions tailored to your business needs.',
                keywords: 'web development, custom websites, web applications, responsive design, SDMTek'
            }
        }
    },
    {
        path: 'digital-marketing', component: DigitalMarketingComponent,
        data: {
            seo: {
                title: 'Digital Marketing Services | SDMTek',
                description: 'Explore SDMTek\'s digital marketing services, including SEO, social media marketing, and online advertising strategies to boost your business growth.',
                keywords: 'digital marketing, SEO, social media marketing, online advertising, SDMTek'
            }
        }
    },
    {
        path: 'about',
        component: AboutComponent,
        data: {
            seo: {
                title: 'About SDMTek - Digital Excellence & Innovation',
                description: 'Learn about SDMTek and our experience delivering high-impact software engineering and digital marketing outcomes for growing businesses.',
                keywords: 'about SDMTek, software company, digital agency, technology experts, experienced developers'
            }
        }
    },
    {
        path: 'contact',
        component: ContactComponent,
        data: {
            seo: {
                title: 'Contact SDMTek - Start Your Project',
                description: 'Contact SDMTek to discuss your software development and digital marketing goals. Book a consultation and get a tailored plan.',
                keywords: 'contact SDMTek, software development quote, digital marketing consultation'
            }
        }
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
