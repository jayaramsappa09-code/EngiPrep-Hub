import { isSupabaseConfigured } from './supabase.js'

function showConfigWarning() {
  if (isSupabaseConfigured()) return

  const banner = document.createElement('div')
  banner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ef4444;
    color: white;
    padding: 12px;
    text-align: center;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    z-index: 9999;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  `
  banner.innerHTML = `
    ⚠️ Supabase Not Configured! 
    Please set <code style="background:rgba(0,0,0,0.2);padding:2px 4px;border-radius:4px">VITE_SUPABASE_URL</code> 
    and <code style="background:rgba(0,0,0,0.2);padding:2px 4px;border-radius:4px">VITE_SUPABASE_ANON_KEY</code> 
    in the <b>Settings</b> menu to enable full functionality.
  `
  document.body.appendChild(banner)
  document.body.style.paddingBottom = '50px'
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showConfigWarning)
} else {
  showConfigWarning()
}
