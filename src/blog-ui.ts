
import { getSeededDailyBlogs, Blog } from './blog-db';

document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById('blog-feed');
    const trendingContainer = document.getElementById('trending-topics');
    
    if(!feedContainer || !trendingContainer) return;

    const blogs = getSeededDailyBlogs();
    
    // Extract unique tags and pick a few for trending
    const allTags = new Set<string>();
    blogs.forEach(b => b.tags.forEach(t => allTags.add(t)));
    const trendingTags = Array.from(allTags).slice(0, 8);

    trendingContainer.innerHTML = trendingTags.map(tag => `
        <span class="px-3 py-1.5 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-slate-800 transition-colors">
            #${tag}
        </span>
    `).join('');

    // Generate blog cards
    let feedHTML = '';
    
    blogs.forEach((blog, index) => {
        const isToday = index === 0;
        
        feedHTML += `
            <article class="p-8 border ${isToday ? 'border-blue-500/40 bg-slate-900 shadow-xl shadow-blue-900/10' : 'border-slate-800 bg-slate-900'} rounded-2xl hover:border-blue-500/40 transition-all duration-300 group">
                ${isToday ? '<div class="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-md"><span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span><span class="text-[10px] font-black text-blue-400 uppercase tracking-widest">Today\'s Top Insight</span></div>' : ''}
                
                <h2 class="text-2xl font-black text-slate-50 mb-3 group-hover:text-blue-400 transition-colors">${blog.title}</h2>
                <div class="flex items-center gap-3 mb-6 flex-wrap">
                    <span class="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase rounded border border-slate-700">${blog.category}</span>
                    <span class="text-slate-500 text-xs font-bold">•</span>
                    <span class="text-slate-500 text-xs font-bold">${3 + Math.floor(blog.content.length / 300)} min read</span>
                </div>
                
                <div class="mb-6 rounded-xl overflow-hidden relative">
                    <p class="text-slate-400 text-sm font-medium italic border-l-4 border-blue-500/50 pl-4 py-1">
                        ${blog.excerpt}
                    </p>
                </div>

                <div class="content-body text-slate-300">
                    ${blog.content}
                </div>
                
                <div class="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
                    ${blog.tags.map(t => `<span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">#${t}</span>`).join('&nbsp;&nbsp;|&nbsp;&nbsp;')}
                </div>
            </article>
        `;
    });

    feedContainer.innerHTML = feedHTML;
});
