
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
                
                <!-- Comments Section -->
                <div class="mt-8 pt-6 border-t border-slate-800">
                    <div class="flex items-center justify-between mb-4 cursor-pointer select-none" onclick="window.toggleComments(${blog.id})">
                        <h3 class="text-sm font-black uppercase tracking-wider text-slate-50 flex items-center gap-2">
                            <span>💬</span> Comments (<span id="comment-count-${blog.id}">0</span>)
                        </h3>
                        <span id="comment-icon-${blog.id}" class="text-slate-500 transition-transform duration-300">▼</span>
                    </div>
                    
                    <div id="comments-container-${blog.id}" class="hidden space-y-4 pt-2">
                        <div id="comments-list-${blog.id}" class="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            <!-- Comments injected here -->
                        </div>
                        <form onsubmit="window.submitComment(event, ${blog.id})" class="flex gap-2">
                            <input type="text" id="comment-input-${blog.id}" required placeholder="Add a comment..." class="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                            <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors">Post</button>
                        </form>
                    </div>
                </div>
            </article>
        `;
    });

    feedContainer.innerHTML = feedHTML;
    
    // Initialize comments
    blogs.forEach(blog => {
        window.loadComments(blog.id);
    });
});

// Comment Logic
interface Comment {
    id: string;
    text: string;
    author: string;
    date: string;
}

const COMMENTS_STORAGE_KEY = 'engiPrep_blog_comments_';

(window as any).toggleComments = (blogId: number) => {
    const container = document.getElementById(`comments-container-${blogId}`);
    const icon = document.getElementById(`comment-icon-${blogId}`);
    if(container && icon) {
        container.classList.toggle('hidden');
        if(container.classList.contains('hidden')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    }
};

(window as any).loadComments = (blogId: number) => {
    const list = document.getElementById(`comments-list-${blogId}`);
    const count = document.getElementById(`comment-count-${blogId}`);
    if(!list || !count) return;

    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY + blogId);
    const comments: Comment[] = raw ? JSON.parse(raw) : [];
    
    count.textContent = comments.length.toString();
    
    if (comments.length === 0) {
        list.innerHTML = `<p class="text-xs text-slate-500 italic text-center py-4">No comments yet. Be the first!</p>`;
        return;
    }

    list.innerHTML = comments.map(c => {
        const dateObj = new Date(c.date);
        const timeStr = dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric'}) + ' ' + dateObj.toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'});
        return `
            <div class="px-4 py-3 bg-slate-950/50 border border-slate-800/50 rounded-xl">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-xs font-bold text-slate-300 flex items-center gap-2">
                        <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] uppercase">${c.author.substring(0,1)}</span>
                        ${c.author}
                    </span>
                    <span class="text-[10px] text-slate-500">${timeStr}</span>
                </div>
                <p class="text-sm text-slate-400 pl-7">${c.text}</p>
            </div>
        `;
    }).join('');
};

(window as any).submitComment = (e: Event, blogId: number) => {
    e.preventDefault();
    const input = document.getElementById(`comment-input-${blogId}`) as HTMLInputElement;
    if(!input || !input.value.trim()) return;

    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY + blogId);
    const comments: Comment[] = raw ? JSON.parse(raw) : [];

    const newComment: Comment = {
        id: crypto.randomUUID(),
        text: input.value.trim(),
        author: localStorage.getItem('engiPrep_user_name') || 'Student', // Uses stored name if available, else Student
        date: new Date().toISOString()
    };

    comments.push(newComment);
    localStorage.setItem(COMMENTS_STORAGE_KEY + blogId, JSON.stringify(comments));

    input.value = '';
    (window as any).loadComments(blogId);
};
