import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { IconGithub } from './components/svgs/github/github';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [IconGithub],
})
export class App implements AfterViewInit, OnDestroy {
  activeSection = 'home';
  menuOpen = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.initAnimations();
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    gsap.killTweensOf('*');
  }

  /* =====================================================
     MAIN
  ===================================================== */

  initAnimations() {
    this.heroAnimation();
    this.backgroundAnimation();
    this.parallaxHero();
    this.aosAnimations();

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }

  /* =====================================================
     HERO INTRO
  ===================================================== */

  heroAnimation() {
    gsap.from('.hero-content > *', {
      y: 50,
      x: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.18,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  /* =====================================================
     BACKGROUND LOOP
  ===================================================== */

  backgroundAnimation() {
    gsap.to('.animated-bg', {
      backgroundPosition: '100% 100%',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });
  }

  /* =====================================================
     HERO PARALLAX
  ===================================================== */

  parallaxHero() {
    gsap.to('.hero-content', {
      y: 80,
      opacity: 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* =====================================================
     AOS STYLE REVEAL
  ===================================================== */

  aosAnimations() {
    this.fadeUp('.about-text p');
    this.fadeUp('.about-list li', 0.08);
    this.fadeUp('.stat-box', 0.12);

    this.fadeUp('.skill-card', 0.08);

    this.fadeLeft('.experience-card', 0.12);

    this.fadeUp('.project-card', 0.12);

    this.zoomIn('.contact-card', 0.08);

    this.titleReveal('section h2');
  }

  /* =====================================================
     REUSABLE EFFECTS
  ===================================================== */

  fadeUp(selector: string, stagger = 0) {
    gsap.from(selector, {
      y: 45,
      opacity: 0,
      duration: 0.9,
      stagger,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: selector,
        start: 'top 88%',
        toggleActions: 'play none none reset',
      },
    });
  }

  fadeLeft(selector: string, stagger = 0) {
    gsap.from(selector, {
      x: -60,
      opacity: 0,
      duration: 0.9,
      stagger,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: selector,
        start: 'top 88%',
        toggleActions: 'play none none reset',
      },
    });
  }

  zoomIn(selector: string, stagger = 0) {
    gsap.from(selector, {
      scale: 0.85,
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger,
      ease: 'back.out(1.7)',
      immediateRender: false,
      scrollTrigger: {
        trigger: selector,
        start: 'top 88%',
        toggleActions: 'play none none reset',
      },
    });
  }

  titleReveal(selector: string) {
    gsap.from(selector, {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: selector,
        start: 'top 92%',
        toggleActions: 'play none none reset',
      },
    });
  }

  /* =====================================================
     NAVIGATION
  ===================================================== */

  scrollToSection(sectionId: string) {
    if (!this.isBrowser) return;

    const element = document.getElementById(sectionId);

    this.closeMenu();

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      this.activeSection = sectionId;
    }
  }

  toggleMenu() {
    if (!this.isBrowser) return;

    this.menuOpen = !this.menuOpen;

    gsap.to('.mobile-menu', {
      height: this.menuOpen ? 'auto' : 0,
      opacity: this.menuOpen ? 1 : 0,
      duration: 0.35,
      ease: this.menuOpen ? 'power2.out' : 'power2.in',
    });
  }

  closeMenu() {
    this.menuOpen = false;

    gsap.to('.mobile-menu', {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
  }
}
