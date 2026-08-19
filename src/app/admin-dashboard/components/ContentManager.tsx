'use client';
import React, { useState } from 'react';

type Article = {
  id: number;
  title: string;
  tag: string;
  date: string;
  status: 'Published' | 'Draft';
  excerpt: string;
};

const initialArticles: Article[] = [
  { id: 1, title: 'Lakesite FA U16s Win Nairobi West Regional Championship', tag: 'Match Result', date: '28/07/2025', status: 'Published', excerpt: 'Our U16 squad delivered a stunning 3-1 victory over Kibera FC in the final.' },
  { id: 2, title: 'Holiday Training Camp: August 2025 Registration Open', tag: 'Event', date: '20/07/2025', status: 'Published', excerpt: 'Our intensive 5-day holiday training camp runs August 18–22 at Lakesite School.' },
  { id: 3, title: 'Three Academy Players Called Up to Nairobi County Squad', tag: 'Achievement', date: '15/07/2025', status: 'Published', excerpt: 'Congratulations to Brian Mutua, Collins Odhiambo, and Sheila Wambui.' },
  { id: 4, title: 'New Strength & Conditioning Programme Launches for U16+', tag: 'Academy News', date: '08/07/2025', status: 'Published', excerpt: 'Coach James Kamau introduces a periodized strength and conditioning curriculum.' },
  { id: 5, title: 'Upcoming: Friendly Match vs Mathare Youth FC', tag: 'Match Preview', date: '01/08/2025', status: 'Draft', excerpt: 'Pre-season friendly scheduled for August 15 at Lakesite School pitch.' },
  { id: 6, title: 'FKF National Youth Tournament: Quarter-Final Win', tag: 'Tournament', date: '22/06/2025', status: 'Published', excerpt: 'Our U19 squad beat Mathare United Youth 2-0 in the quarter-finals.' },
];

type FormState = { title: string; tag: string; excerpt: string; status: 'Published' | 'Draft' };
const emptyForm: FormState = { title: '', tag: '', excerpt: '', status: 'Draft' };

export default function ContentManager() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openNew = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (a: Article) => {
    setForm({ title: a.title, tag: a.tag, excerpt: a.excerpt, status: a.status });
    setEditId(a.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editId !== null) {
      setArticles((prev) => prev.map((a) => a.id === editId ? { ...a, ...form } : a));
    } else {
      const newArticle: Article = {
        id: Date.now(),
        ...form,
        date: new Date().toLocaleDateString('en-GB'),
      };
      setArticles((prev) => [newArticle, ...prev]);
    }
    setShowForm(false);
    setForm(emptyForm);
    setEditId(null);
  };

  const handleDelete = (id: number) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleStatus = (id: number) => {
    setArticles((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: a.status === 'Published' ? 'Draft' : 'Published' } : a)
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">News & Content</h2>
          <p className="text-sm text-muted-foreground">{articles.length} articles total</p>
        </div>
        <button
          onClick={openNew}
          className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          Add Article
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-foreground">{editId ? 'Edit Article' : 'New Article'}</h3>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="Article title..."
              className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Tag</label>
              <input
                type="text"
                value={form.tag}
                onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                placeholder="e.g. Match Result"
                className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as 'Published' | 'Draft' }))}
                className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Excerpt</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              placeholder="Short article summary..."
              className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
            >
              {editId ? 'Save Changes' : 'Publish Article'}
            </button>
            <button
              onClick={() => { setShowForm(false); setForm(emptyForm); setEditId(null); }}
              className="border border-border text-muted-foreground text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Articles List */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="divide-y divide-border">
          {articles.map((article) => (
            <div key={article.id} className="flex items-start gap-4 px-5 py-4 hover:bg-muted/40 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{article.tag}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${article.status === 'Published' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                    {article.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <p className="font-semibold text-foreground text-sm leading-snug mb-1">{article.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{article.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleStatus(article.id)}
                  className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
                  title="Toggle status"
                >
                  {article.status === 'Published' ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => openEdit(article)}
                  className="text-xs font-semibold text-primary hover:underline px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="text-xs font-semibold text-red-500 hover:underline px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}