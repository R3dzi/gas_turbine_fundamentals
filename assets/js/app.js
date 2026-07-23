/**
 * Gas Turbine Fundamentals – App Logic
 * Ekrany: język → disclaimer → menu
 */

const app = {
  history: [],

  /** Wybór języka */
  selectLang(lang) {
    if (lang !== 'pl') {
      alert('English version is coming soon!\nWersja angielska wkrótce!');
      return;
    }
    localStorage.setItem('gtf-lang', lang);
    this.showScreen('screen-disclaimer');
  },

  /** Akceptacja warunków */
  toggleAccept() {
    const checkbox = document.getElementById('accept-terms');
    const btn = document.getElementById('btn-accept');
    btn.disabled = !checkbox.checked;
  },

  /** Przejście do menu */
  goToMenu() {
    const checkbox = document.getElementById('accept-terms');
    if (!checkbox?.checked) return;
    localStorage.setItem('gtf-accepted', 'true');
    this.showScreen('screen-menu');
  },

  /** Pokazuje ekran, chowa pozostałe */
  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      this.history.push(id);
    }
  },

  /** Cofnięcie do wskazanego ekranu */
  goBack(targetId) {
    this.history = this.history.filter(h => h !== targetId);
    this.showScreen(targetId);
    this.history.pop();
  },

  /** Przywrócenie sesji */
  init() {
    const lang = localStorage.getItem('gtf-lang');
    const accepted = localStorage.getItem('gtf-accepted');

    if (lang === 'pl' && accepted === 'true') {
      this.showScreen('screen-menu');
    } else if (lang === 'pl') {
      this.showScreen('screen-disclaimer');
    }
    // domyślnie zostaje screen-lang
  }
};

document.addEventListener('DOMContentLoaded', () => app.init());