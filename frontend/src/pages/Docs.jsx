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
        content: "Pelajari cara menggunakan TaskFlow untuk meningkatkan produktivitas harian Anda dengan antarmuka yang intuitif.",
        icon: <User size={20} />,
        subsections: [
            { 
              subtitle: "1. Tampilan Dashboard Utama", 
              text: "Dashboard TaskFlow dirancang dengan layout yang bersih untuk memaksimalkan fokus pengguna. Antarmuka ini terbagi menjadi tiga komponen utama yang bekerja secara harmonis:\n\n• **Task Creation Form**: Terletak di sisi kiri untuk input cepat tugas baru.\n• **Task Preview Table**: Daftar utama di sisi kanan untuk memantau semua tugas.\n• **Stats Counter**: Ringkasan status tugas di pojok kanan atas.",
              images: [
                { url: "/screenshots/create-form.png", caption: "Panel Input: Form pembuatan tugas baru yang bersih dan minimalis." },
                { url: "/screenshots/task-list-table.png", caption: "Daftar Tugas: Tabel interaktif untuk memantau detail dan status tugas." },
                { url: "/screenshots/stats-counter.png", caption: "Indikator Statistik: Ringkasan jumlah tugas total dan yang sudah selesai." }
              ]
            },
            { 
              subtitle: "2. Membuat Tugas Baru", 
              text: "Gunakan form 'Create Task' di sisi kiri. Isi judul tugas dan deskripsi jika diperlukan. Sistem akan otomatis memberikan status 'New' pada tugas yang baru saja dibuat.",
              image: "/screenshots/create-form.png"
            },
            { 
              subtitle: "3. Memperbarui Tugas", 
              text: "Anda dapat mengubah detail tugas kapan saja. Klik ikon pensil di baris tugas untuk memuat kembali data ke dalam form, lalu simpan perubahan Anda.",
              image: "/screenshots/update-form.png"
            },
            { 
              subtitle: "4. Aksi & Navigasi", 
              text: "Setiap tugas memiliki tombol aksi cepat. Gunakan ikon sampah untuk menghapus tugas. Pastikan Anda melihat indikator status di pojok kanan atas untuk ringkasan tugas harian Anda.",
              image: "/screenshots/action-button.png",
              imageClassName: "max-w-xs mx-auto"
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
      <div className="my-8 space-y-8">
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
          <img src="/screenshots/main-app.png" alt="Main Dashboard" className="w-full h-auto" />
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
            Tampilan Utama Dashboard TaskFlow
          </div>
        </div>
      </div>
    );
  }
  
  if (type === 'status') {
    return (
      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-blue-50/50 p-4 flex justify-center">
            <img src="/screenshots/task-status-new.png" alt="Status New" className="h-12 w-auto" />
          </div>
          <div className="p-4 text-center">
            <span className="block font-bold text-slate-900 mb-1">New</span>
            <span className="text-xs text-slate-400">Tugas yang baru dibuat</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50/50 p-4 flex justify-center">
            <img src="/screenshots/task-status-pending.png" alt="Status Pending" className="h-12 w-auto" />
          </div>
          <div className="p-4 text-center">
            <span className="block font-bold text-slate-900 mb-1">Pending</span>
            <span className="text-xs text-slate-400">Sedang dikerjakan</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-emerald-50/50 p-4 flex justify-center">
            <img src="/screenshots/task-status-done.png" alt="Status Done" className="h-12 w-auto" />
          </div>
          <div className="p-4 text-center">
            <span className="block font-bold text-slate-900 mb-1">Done</span>
            <span className="text-xs text-slate-400">Tugas selesai</span>
          </div>
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
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-6">{sub.text}</p>
                  
                  {sub.image && (
                    <div className={`mt-4 border border-slate-200 rounded-xl overflow-hidden shadow-md ${sub.imageClassName || ''}`}>
                      <img src={sub.image} alt={sub.subtitle} className="w-full h-auto" />
                    </div>
                  )}

                  {sub.images && (
                    <div className="grid grid-cols-1 gap-6 mt-6">
                      {sub.images.map((img, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden shadow-md">
                          <img src={img.url} alt={img.caption} className="w-full h-auto" />
                          <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-center text-xs text-slate-500 font-medium italic">
                            {img.caption}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
