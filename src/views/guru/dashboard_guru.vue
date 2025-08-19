<template>
  <div class="dashboard-layout">
    <SidebarGuru @sidebar-change="handleSidebarChange" />
    
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container guru-dashboard">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1>👨‍🏫 Dashboard Guru</h1>
          <p class="welcome-text">Selamat datang, Pak Budi! Semoga hari Anda menyenangkan.</p>
        </div>

        <!-- Statistik Ringkas -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h3>Total Materi</h3>
              <div class="stat-number">{{ stats.totalMateri }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✍️</div>
            <div class="stat-content">
              <h3>Total Tugas</h3>
              <div class="stat-number">{{ stats.totalTugas }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <h3>Total Siswa</h3>
              <div class="stat-number">{{ stats.totalSiswa }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <h3>Rata-rata Nilai</h3>
              <div class="stat-number">{{ stats.rataNilai }}</div>
            </div>
          </div>
        </div>

        <!-- Materi yang Diampu -->
        <div class="content-section">
          <div class="section-header">
            <h2>📚 Materi yang Diampu</h2>
            <button class="btn-primary" @click="handleAction('tambahMateri')">+ Tambah Materi</button>
          </div>
          <div class="materi-grid">
            <div v-for="m in materiList" :key="m.id" class="materi-card" @click="viewMateri(m)">
              <div class="materi-header">
                <h3>{{ m.judul }}</h3>
                <span class="materi-subject">{{ m.mataPelajaran }}</span>
              </div>
              <p class="materi-desc">{{ m.deskripsi }}</p>
              <div class="materi-meta">
                <span>📅 {{ m.tanggal }}</span>
                <span>👥 {{ m.jumlahSiswa }} Siswa</span>
              </div>
              <div class="materi-actions">
                <button class="btn-secondary" @click.stop="editMateri(m)">Edit</button>
                <button class="btn-outline" @click.stop="viewMateri(m)">Lihat</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tugas yang Dibuat -->
        <div class="content-section">
          <div class="section-header">
            <h2>✍️ Tugas yang Dibuat</h2>
            <button class="btn-primary" @click="handleAction('buatTugas')">+ Buat Tugas</button>
          </div>
          <div class="tugas-grid">
            <div v-for="t in tugasList" :key="t.id" class="tugas-card" @click="viewTugas(t)">
              <div class="tugas-header">
                <h3>{{ t.judul }}</h3>
                <span class="tugas-subject">{{ t.mataPelajaran }}</span>
              </div>
              <p class="tugas-desc">{{ t.deskripsi }}</p>
              <div class="tugas-meta">
                <span>📅 Deadline: {{ t.deadline }}</span>
                <span>👥 {{ t.jumlahSiswa }} Siswa</span>
                <span>✅ {{ t.sudahDikerjakan }} Selesai</span>
              </div>
              <div class="tugas-actions">
                <button class="btn-secondary" @click.stop="editTugas(t)">Edit</button>
                <button class="btn-outline" @click.stop="viewTugasResult(t)">Lihat Hasil</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Aktivitas Terbaru -->
        <div class="content-section">
          <div class="section-header">
            <h2>📋 Aktivitas Terbaru</h2>
            <button class="btn-outline" @click="handleAction('lihatSemuaAktivitas')">Lihat Semua</button>
          </div>
          <div class="activity-list">
            <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
              <div class="activity-icon">{{ activity.icon }}</div>
              <div class="activity-content">
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.description }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarGuru from '../../components/NavbarGuru.vue';

export default {
  name: 'DashboardGuru',
  components: {
    SidebarGuru
  },
  data() {
    return {
      sidebarCollapsed: false,
      stats: {
        totalMateri: 12,
        totalTugas: 8,
        totalSiswa: 45,
        rataNilai: 8.5
      },
      materiList: [
        {
          id: 1,
          judul: 'Pengenalan Algoritma',
          mataPelajaran: 'Pemrograman Dasar',
          deskripsi: 'Materi dasar tentang algoritma dan logika pemrograman untuk pemula.',
          tanggal: '2024-01-15',
          jumlahSiswa: 25
        },
        {
          id: 2,
          judul: 'Struktur Data Array',
          mataPelajaran: 'Struktur Data',
          deskripsi: 'Pembahasan mendalam tentang array dan implementasinya dalam program.',
          tanggal: '2024-01-12',
          jumlahSiswa: 30
        },
        {
          id: 3,
          judul: 'Object Oriented Programming',
          mataPelajaran: 'Pemrograman Lanjut',
          deskripsi: 'Konsep dasar OOP dengan contoh implementasi dalam Java.',
          tanggal: '2024-01-10',
          jumlahSiswa: 20
        }
      ],
      tugasList: [
        {
          id: 1,
          judul: 'Implementasi Algoritma Sorting',
          mataPelajaran: 'Pemrograman Dasar',
          deskripsi: 'Buat program untuk mengimplementasikan algoritma bubble sort dan selection sort.',
          deadline: '2024-01-20',
          jumlahSiswa: 25,
          sudahDikerjakan: 18
        },
        {
          id: 2,
          judul: 'Aplikasi Manajemen Data',
          mataPelajaran: 'Struktur Data',
          deskripsi: 'Buat aplikasi sederhana untuk mengelola data mahasiswa menggunakan array.',
          deadline: '2024-01-25',
          jumlahSiswa: 30,
          sudahDikerjakan: 22
        }
      ],
      recentActivities: [
        {
          id: 1,
          icon: '📚',
          title: 'Materi Baru Ditambahkan',
          description: 'Materi "Pengenalan Algoritma" telah ditambahkan ke kelas Pemrograman Dasar',
          time: '2 jam yang lalu'
        },
        {
          id: 2,
          icon: '✍️',
          title: 'Tugas Dikumpulkan',
          description: '15 siswa telah mengumpulkan tugas "Implementasi Algoritma Sorting"',
          time: '4 jam yang lalu'
        },
        {
          id: 3,
          icon: '📊',
          title: 'Nilai Diperbarui',
          description: 'Nilai tugas "Aplikasi Manajemen Data" telah diperbarui',
          time: '1 hari yang lalu'
        }
      ]
    }
  },
  methods: {
    handleSidebarChange(data) {
      this.sidebarCollapsed = data.collapsed;
    },
    handleAction(action) {
      switch(action) {
        case 'tambahMateri':
          this.$router.push('/guru/materi/tambah');
          break;
        case 'buatTugas':
          this.$router.push('/guru/tugas/buat');
          break;
        case 'lihatSemuaAktivitas':
          // Navigate to activity log
          break;
        default:
          console.log('Action:', action);
      }
    },
    viewMateri(materi) {
      this.$router.push(`/guru/materi/${materi.id}`);
    },
    editMateri(materi) {
      this.$router.push(`/guru/materi/edit/${materi.id}`);
    },
    viewTugas(tugas) {
      this.$router.push(`/guru/tugas/${tugas.id}`);
    },
    editTugas(tugas) {
      this.$router.push(`/guru/tugas/edit/${tugas.id}`);
    },
    viewTugasResult(tugas) {
      this.$router.push(`/guru/tugas/nilai/${tugas.id}`);
    }
  }
}
</script>

<style scoped>
.guru-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  border-radius: 16px;
  color: white;
}

.welcome-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text {
  font-size: 1.1rem;
  opacity: 0.9;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-content h3 {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.stat-number {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
}

.content-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.materi-grid,
.tugas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.materi-card,
.tugas-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.materi-card:hover,
.tugas-card:hover {
  border-color: #059669;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.materi-header,
.tugas-header {
  margin-bottom: 0.75rem;
}

.materi-header h3,
.tugas-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.materi-subject,
.tugas-subject {
  background: #059669;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.materi-desc,
.tugas-desc {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.materi-meta,
.tugas-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.materi-actions,
.tugas-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-primary,
.btn-secondary,
.btn-outline {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: #059669;
  color: white;
}

.btn-primary:hover {
  background: #047857;
}

.btn-secondary {
  background: #f59e0b;
  color: white;
}

.btn-secondary:hover {
  background: #d97706;
}

.btn-outline {
  background: transparent;
  color: #059669;
  border: 1px solid #059669;
}

.btn-outline:hover {
  background: #059669;
  color: white;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.activity-icon {
  font-size: 1.5rem;
  background: #059669;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-content h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.activity-content p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .guru-dashboard {
    padding: 1rem;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .materi-grid,
  .tugas-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .welcome-section h1 {
    font-size: 2rem;
  }
}
</style>
