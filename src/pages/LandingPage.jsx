import { useEffect } from "react";
import "./../styles/LandingPage.css";

//Components
import LandingPageChild1 from "../components/Landingpage_child/LandingPageChild1";

export default function LandingPage() {
  useEffect(() => {
    class StickyNavigation {
      constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        this.tabs = document.querySelectorAll(".et-hero-tab");
        this.tabContainer = document.querySelector(".et-hero-tabs-container");
        this.tabSlider = document.querySelector(".et-hero-tab-slider");
        this.sections = document.querySelectorAll(".et-slide");
        this.scrollHandler = this.onScroll.bind(this);
        this.resizeHandler = this.onResize.bind(this);
        this.init();
      }

      init() {
        this.tabs.forEach((tab) => {
          tab.addEventListener("click", (event) => this.onTabClick(event, tab));
        });
        window.addEventListener("scroll", this.scrollHandler);
        window.addEventListener("resize", this.resizeHandler);
        this.observer = new IntersectionObserver(
          this.onIntersection.bind(this),
          { threshold: 0.6 }
        );
        this.sections.forEach((section) => this.observer.observe(section));
      }

      onTabClick(event, element) {
        event.preventDefault();
        const target = document.querySelector(element.getAttribute("href"));
        const scrollTop = target.offsetTop - this.tabContainerHeight + 1;
        window.scrollTo({ top: scrollTop, behavior: "smooth" });
      }

      onScroll() {
        this.checkTabContainerPosition();
      }

      onResize() {
        if (this.currentId) {
          this.setSliderCss();
        }
      }

      checkTabContainerPosition() {
        const offset =
          this.tabContainer.offsetTop +
          this.tabContainer.offsetHeight -
          this.tabContainerHeight;
        if (window.scrollY > offset) {
          this.tabContainer.classList.add("et-hero-tabs-container--top");
        } else {
          this.tabContainer.classList.remove("et-hero-tabs-container--top");
        }
      }

      onIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const currentTab = document.querySelector(
              `.et-hero-tab[href="#${id}"]`
            );
            if (this.currentId !== `#${id}`) {
              this.currentId = `#${id}`;
              this.currentTab = currentTab;
              this.setSliderCss();
            }
          }
        });
      }

      setSliderCss() {
        if (this.currentTab) {
          const { width, left } = this.currentTab.getBoundingClientRect();
          this.tabSlider.style.width = `${width}px`;
          this.tabSlider.style.left = `${left}px`;
        }
      }

      destroy() {
        window.removeEventListener("scroll", this.scrollHandler);
        window.removeEventListener("resize", this.resizeHandler);
        this.tabs.forEach((tab) =>
          tab.removeEventListener("click", this.onTabClick)
        );
        this.sections.forEach((section) => this.observer.unobserve(section));
      }
    }

    const stickyNavigation = new StickyNavigation();

    return () => {
      stickyNavigation.destroy();
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="et-hero-tabs">
          <LandingPageChild1 />
        <div className="et-hero-tabs-container">
          <a className="et-hero-tab" href="#tab-es6">
            Pictures
          </a>
          <a className="et-hero-tab" href="#tab-flexbox">
            Drone Shots
          </a>
          <a className="et-hero-tab" href="#tab-react">
            React
          </a>
          <a className="et-hero-tab" href="#tab-angular">
            Angular
          </a>
          <a className="et-hero-tab" href="#tab-other">
            Other
          </a>
          <span className="et-hero-tab-slider"></span>
        </div>
      </section>

      {/* Main */}
      <main className="et-main">
        <section className="et-slide" id="tab-es6">
          <h1>ES6</h1>
          <h3>something about es6</h3>
        </section>
        <section className="et-slide" id="tab-flexbox">
          <h1>Flexbox</h1>
          <h3>something about flexbox</h3>
        </section>
        <section className="et-slide" id="tab-react">
          <h1>React</h1>
          <h3>something about react</h3>
        </section>
        <section className="et-slide" id="tab-angular">
          <h1>Angular</h1>
          <h3>something about angular</h3>
        </section>
        <section className="et-slide" id="tab-other">
          <h1>Other</h1>
          <h3>something about other</h3>
        </section>
      </main>
    </div>
  );
}
