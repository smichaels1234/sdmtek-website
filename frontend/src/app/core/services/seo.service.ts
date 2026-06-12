import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PageSeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}

interface RouteSeoData {
  seo?: PageSeoData;
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteUrl = 'https://www.sdmtek.com';
  private readonly defaultImage = `${this.siteUrl}/SDMTek.jpg`;
  private readonly defaultPageData: PageSeoData = {
    title: 'SDMTek - Expert Software Engineering & Digital Marketing Solutions',
    description: 'Transform your business with SDMTek\'s expert software engineering and digital marketing services. 500+ successful projects, 15+ years experience. Custom web development, mobile apps, SEO, and cloud solutions.',
    keywords: 'software engineering, digital marketing, web development, mobile apps, SEO, digital transformation, technology consulting, custom software development',
    ogImage: this.defaultImage
  };
  
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {
    // Update meta tags on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMetaTagsFromRoute();
    });

    // Apply SEO tags on first render as well.
    this.updateMetaTagsFromRoute();
  }

  /**
   * Update meta tags based on current route
   */
  private updateMetaTagsFromRoute(): void {
    const routeData = this.getCurrentRouteData();
    this.updateMetaTags(routeData.seo ?? this.defaultPageData);
    this.updateRobotsTag(Boolean(routeData.noIndex));
  }

  private getCurrentRouteData(): RouteSeoData {
    let snapshot: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;

    while (snapshot?.firstChild) {
      snapshot = snapshot.firstChild;
    }

    return (snapshot?.data as RouteSeoData | undefined) ?? {};
  }

  /**
   * Update all meta tags with provided data
   */
  updateMetaTags(data: PageSeoData): void {
    const { title, description, keywords, ogImage } = data;
    const url = this.buildAbsoluteUrl(this.router.url);
    const image = ogImage || this.defaultImage;

    // Set page title
    this.title.setTitle(title);

    // Update standard meta tags
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Update Open Graph meta tags
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Update Twitter meta tags
    this.meta.updateTag({ property: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'twitter:image', content: image });
    this.meta.updateTag({ property: 'twitter:url', content: url });
    this.meta.updateTag({ property: 'twitter:card', content: 'summary_large_image' });

    // Update canonical URL
    this.updateCanonicalUrl(url);
  }

  private updateRobotsTag(noIndex: boolean): void {
    const content = noIndex ? 'noindex, nofollow' : 'index, follow';
    this.meta.updateTag({ name: 'robots', content });
  }

  private buildAbsoluteUrl(path: string): string {
    const cleanPath = path.split(/[?#]/)[0] || '/';
    return `${this.siteUrl}${cleanPath}`;
  }

  /**
   * Set custom page title
   */
  setPageTitle(title: string): void {
    this.title.setTitle(`${title} | SDMTek`);
    this.meta.updateTag({ property: 'og:title', content: `${title} | SDMTek` });
    this.meta.updateTag({ property: 'twitter:title', content: `${title} | SDMTek` });
  }

  /**
   * Update description meta tag
   */
  updateDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'twitter:description', content: description });
  }

  /**
   * Update keywords meta tag
   */
  updateKeywords(keywords: string): void {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  /**
   * Update canonical URL
   */
  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    
    link.setAttribute('href', url);
  }

  /**
   * Add structured data to page
   */
  addStructuredData(data: any): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Generate FAQ structured data
   */
  generateFaqSchema(faqs: Array<{ question: string; answer: string }>): any {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  /**
   * Generate Article structured data
   */
  generateArticleSchema(article: {
    headline: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
  }): any {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.headline,
      "description": article.description,
      "author": {
        "@type": "Organization",
        "name": article.author || "SDMTek"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SDMTek",
        "logo": {
          "@type": "ImageObject",
          "url": `${this.siteUrl}/SDMTek.png`
        }
      },
      "datePublished": article.datePublished,
      "dateModified": article.dateModified || article.datePublished,
      "image": article.image || this.defaultImage
    };
  }
}
