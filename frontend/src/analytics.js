// Google Analytics 4. Loads only when VITE_GA_ID (e.g. G-XXXXXXX) is set in the build environment.
const id = import.meta.env.VITE_GA_ID;
if (id) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.append(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', id);
}
