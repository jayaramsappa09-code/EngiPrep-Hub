export function initCookieBanner() {
    if (localStorage.getItem('cookie-accepted') === 'true') return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'fixed bottom-0 w-full bg-slate-900 border-t border-slate-700 p-4 shadow-2xl z-[100] text-slate-50 flex flex-col md:flex-row items-center justify-between gap-4';
    banner.innerHTML = `
        <p class="text-sm">We use cookies to improve your experience and provide essential services. By using this site, you agree to our use of cookies.</p>
        <div class="flex gap-2">
            <a href="/cookie-policy.html" class="text-sm text-blue-400 hover:text-blue-300 font-bold">Learn More</a>
            <button id="accept-cookies" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold text-white transition-colors">Accept</button>
        </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookie-accepted', 'true');
        banner.remove();
    });
}
