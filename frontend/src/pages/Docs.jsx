import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUp,
  Layout,
  User,
  Calendar,
  FileText,
  Settings,
  Database,
  Image as ImageIcon,
  MessageSquare,
  Tag,
  Monitor,
  CheckCircle2,
  Info
} from 'lucide-react';

const docData = {
    'pendahuluan': {
        title: "Pendahuluan: TaskFlow System",
        content: "Selamat datang di dokumentasi resmi TaskFlow. Platform ini dirancang untuk memudahkan manajemen tugas secara efisien menggunakan stack modern Laravel 12 dan React 19.",
        icon: <Info size={20} />,
        subsections: [
            { subtitle: "Visi Platform", text: "Menjadi solusi manajemen tugas yang paling sederhana namun powerful, mendukung alur kerja individu maupun tim dengan transparansi status yang jelas." },
            { subtitle: "Struktur Aplikasi", text: "Aplikasi ini terbagi menjadi dua bagian utama: Dashboard interaktif untuk pengguna dan API yang kuat di backend." }
        ]
    },
    'status-lifecycle': {
        title: "1. Siklus Hidup Tugas",
        content: "Memahami tiga tahap status utama dalam TaskFlow untuk pelacakan yang akurat.",
        icon: <CheckCircle2 size={20} />,
        subsections: [
            { subtitle: "Status: New", text: "Tugas yang baru saja dibuat. Ditandai dengan ikon plus biru. Ini adalah tahap inisiasi." },
            { subtitle: "Status: Pending", text: "Tugas yang sedang dalam pengerjaan. Ditandai dengan ikon lingkaran abu-abu." },
            { subtitle: "Status: Done", text: "Tugas yang telah diselesaikan. Ditandai dengan ikon centang hijau dan teks yang dicoret." }
        ]
    },
    'tech-stack': {
        title: "2. Teknologi yang Digunakan",
        content: "Detail teknologi di balik layar yang membuat TaskFlow berjalan mulus.",
        icon: <Settings size={20} />,
        subsections: [
            { subtitle: "Backend", text: "Laravel 12 (PHP 8.3) dengan API Resources untuk standarisasi JSON." },
            { subtitle: "Frontend", text: "React 19 (Vite) dengan Tailwind CSS 4.0 untuk performa dan estetika maksimal." },
            { subtitle: "Database", text: "MySQL 8.0 dengan volume persistence di Docker." }
        ]
    },
    'adminer': {
        title: "3. Manajemen Database (Adminer)",
        content: "Cara menggunakan Adminer untuk inspeksi data secara langsung.",
        icon: <Database size={20} />,
        subsections: [
            { subtitle: "Akses", text: "Akses Adminer di port 8080. Gunakan server 'mysql', user 'todo_user', dan database 'todo_db'." },
            { subtitle: "Keamanan", text: "Adminer hanya tersedia di lingkungan pengembangan dan tidak disarankan untuk produksi tanpa proteksi tambahan." }
        ]
    },
    'user-guide': {
        title: "Panduan Pengguna",
        content: "Pelajari cara menggunakan TaskFlow untuk meningkatkan produktivitas harian Anda.",
        icon: <User size={20} />,
        subsections: [
            { 
              subtitle: "1. Tampilan Dashboard", 
              text: "Dashboard TaskFlow menggunakan tata letak 2-kolom yang modern:\n• Sisi Kiri: Form untuk membuat tugas baru.\n• Sisi Kanan: Daftar tugas yang teratur dengan indikator status visual." 
            },
            { 
              subtitle: "2. Menambah Tugas", 
              text: "Gunakan panel 'Create Task' di sebelah kiri. Masukkan judul tugas (wajib) dan deskripsi (opsional). Klik 'Create Task' dan tugas akan langsung muncul di daftar dengan status 'New'." 
            },
            { 
              subtitle: "3. Mengelola Status", 
              text: "Klik pada ikon status di sebelah kiri setiap tugas untuk mengubah statusnya:\n• New (Plus Biru) ➔ Pending (Lingkaran Abu)\n• Pending ➔ Done (Centang Hijau)\n• Done ➔ Pending (Kembali ke proses)" 
            },
            { 
              subtitle: "4. Edit & Hapus", 
              text: "Gunakan tombol aksi di sebelah kanan setiap baris tugas:\n• Ikon Pensil: Memuat tugas kembali ke form untuk diedit.\n• Ikon Sampah: Menghapus tugas secara permanen (membutuhkan konfirmasi)." 
            }
        ]
    }
};

const navCategories = [
    {
        title: "Umum",
        items: [ { id: 'pendahuluan', label: 'Pendahuluan' } ]
    },
    {
        title: "Penggunaan",
        items: [
            { id: 'user-guide', label: 'Panduan Fitur' },
        ]
    },
    {
        title: "Fitur & Logika",
        items: [
            { id: 'status-lifecycle', label: '1. Siklus Hidup Tugas' },
            { id: 'tech-stack', label: '2. Tech Stack' },
        ]
    },
    {
        title: "Infrastruktur",
        items: [
            { id: 'adminer', label: '3. Adminer (Database)' },
        ]
    }
];

const UIPreview = ({ type }) => {
  if (type === 'dashboard') {
    return (
      <div className="my-8 border border-slate-200 rounded-2xl overflow-hidden shadow-xl bg-slate-100 p-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <div className="ml-4 h-5 w-48 bg-slate-200 rounded-full" />
          </div>
          <div className="p-4 grid grid-cols-12 gap-4">
            <div className="col-span-4 space-y-3">
              <div className="h-32 bg-indigo-50 rounded-xl border-2 border-dashed border-indigo-200 flex items-center justify-center text-indigo-400 text-xs font-bold uppercase">Form Area</div>
              <div className="h-10 bg-indigo-600 rounded-xl" />
            </div>
            <div className="col-span-8 space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-white border border-slate-100 rounded-lg flex items-center px-3 gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100" />
                  <div className="flex-1 h-3 bg-slate-100 rounded-full" />
                  <div className="w-16 h-3 bg-slate-50 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400 font-medium italic">Preview: Tata letak Dashboard 2-Kolom</p>
      </div>
    );
  }
  
  if (type === 'status') {
    return (
      <div className="my-8 grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
            <PlusCircle size={28} />
          </div>
          <span className="font-bold text-slate-900 mb-1">New</span>
          <span className="text-xs text-slate-400">Inisiasi Tugas</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-4">
            <Circle size={28} />
          </div>
          <span className="font-bold text-slate-900 mb-1">Pending</span>
          <span className="text-xs text-slate-400">Dalam Pengerjaan</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
            <CheckCircle2 size={28} />
          </div>
          <span className="font-bold text-slate-900 mb-1">Done</span>
          <span className="text-xs text-slate-400">Selesai</span>
        </div>
      </div>
    );
  }
  return null;
};

const Docs = () => {
  const [activeSection, setActiveSection] = useState('pendahuluan');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNav = navCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docData[item.id].title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const currentDoc = docData[activeSection];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 text-indigo-600">
              <Book size={24} />
              <span className="font-bold text-xl text-slate-800 tracking-tight">TaskFlow <span className="text-indigo-600">Docs</span></span>
            </div>
          </div>

          <div className="flex-1 max-w-md px-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Cari dokumentasi..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <a 
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            Back to App
          </a>
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto flex relative">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky lg:top-16 inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 lg:translate-x-0 h-[calc(100vh-64px)] overflow-y-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6">
            {filteredNav.map((category, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-3">{category.title}</h3>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsSidebarOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between group
                        ${activeSection === item.id 
                          ? 'bg-indigo-50 text-indigo-700' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                      `}
                    >
                      {item.label}
                      {activeSection === item.id && <ChevronRight size={14} className="text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 bg-white lg:bg-transparent">
          <div className="max-w-3xl mx-auto py-12 px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-6 text-indigo-600">
              {currentDoc.icon}
              <span className="text-sm font-semibold uppercase tracking-wider">Documentation</span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">{currentDoc.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">{currentDoc.content}</p>

            {activeSection === 'user-guide' && <UIPreview type="dashboard" />}
            {activeSection === 'status-lifecycle' && <UIPreview type="status" />}

            <div className="space-y-12">
              {currentDoc.subsections.map((sub, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    {sub.subtitle}
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">{sub.text}</p>
                </div>
              ))}
            </div>

            <footer className="mt-20 pt-10 border-t border-slate-200 flex items-center justify-between text-slate-400 text-sm">
              <p>© 2026 TaskFlow System. All rights reserved.</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1.5 text-indigo-600 font-medium hover:text-indigo-700 transition-all"
              >
                <ArrowUp size={16} />
                Scroll to top
              </button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
