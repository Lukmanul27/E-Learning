<template>
  <div class="dashboard-layout">
    <SidebarSiswa @sidebar-change="handleSidebarChange" />
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container siswa-dashboard">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1>👨‍🎓 Dashboard Siswa</h1>
          <p class="welcome-text">Selamat datang, Ani! Semangat belajar hari ini!</p>
        </div>

        <!-- Statistik Ringkas -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h3>Materi Dibaca</h3>
              <div class="stat-number">{{ stats.materiDibaca }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✍️</div>
            <div class="stat-content">
              <h3>Tugas Selesai</h3>
              <div class="stat-number">{{ stats.tugasSelesai }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-content">
              <h3>Rata-rata Nilai</h3>
              <div class="stat-number">{{ stats.rataNilai }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">⏰</div>
            <div class="stat-content">
              <h3>Jam Belajar</h3>
              <div class="stat-number">{{ stats.jamBelajar }}h</div>
            </div>
          </div>
        </div>

        <!-- Materi Terbaru -->
        <div class="content-section">
          <div class="section-header">
            <h2>📚 Materi Terbaru</h2>
            <button class="btn-primary" @click="handleAction('viewAllMateri')">Lihat Semua</button>
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
                <span>👨‍🏫 {{ m.guru }}</span>
              </div>
              <div class="materi-actions">
                <button class="btn-primary" @click.stop="readMateri(m)">Baca</button>
                <button class="btn-outline" @click.stop="downloadMateri(m)">Download</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tugas yang Harus Dikerjakan -->
        <div class="content-section">
          <div class="section-header">
            <h2>✍️ Tugas yang Harus Dikerjakan</h2>
            <button class="btn-primary" @click="handleAction('viewAllTugas')">Lihat Semua</button>
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
                <span>⏱️ {{ t.durasi }}</span>
                <span>👨‍🏫 {{ t.guru }}</span>
              </div>
              <div class="tugas-status" :class="getStatusClass(t.status)">
                {{ getStatusText(t.status) }}
              </div>
              <div class="tugas-actions">
                <button v-if="t.status === 'belum_dikerjakan'" class="btn-primary" @click.stop="startTugas(t)">Mulai Tugas</button>
                <button v-else-if="t.status === 'sedang_dikerjakan'" class="btn-secondary" @click.stop="continueTugas(t)">Lanjutkan</button>
                <button v-else class="btn-outline" @click.stop="viewTugasResult(t)">Lihat Hasil</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Jadwal Hari Ini -->
        <div class="content-section">
          <div class="section-header">
            <h2>📅 Jadwal Hari Ini</h2>
            <button class="btn-outline" @click="handleAction('viewAllSchedule')">Lihat Semua</button>
          </div>
          <div class="jadwal-list">
            <div v-for="j in jadwalList" :key="j.id" class="jadwal-item" @click="viewJadwal(j)">
              <div class="jadwal-time">
                <span class="time">{{ j.waktu }}</span>
                <span class="duration">{{ j.durasi }} menit</span>
              </div>
              <div class="jadwal-content">
                <h4>{{ j.mataPelajaran }}</h4>
                <p>{{ j.topik }}</p>
                <span class="guru">👨‍🏫 {{ j.guru }}</span>
              </div>
              <div class="jadwal-status" :class="getJadwalStatusClass(j.status)">
                {{ j.status }}
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Belajar -->
        <div class="content-section">
          <div class="section-header">
            <h2>📈 Progress Belajar</h2>
            <button class="btn-outline" @click="handleAction('viewDetailedProgress')">Lihat Detail</button>
          </div>
          <div class="progress-grid">
            <div v-for="p in progressList" :key="p.id" class="progress-card" @click="viewSubjectProgress(p)">
              <div class="progress-header">
                <h4>{{ p.mataPelajaran }}</h4>
                <span class="progress-percentage">{{ p.persentase }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: p.persentase + '%' }"></div>
              </div>
              <div class="progress-details">
                <span>📚 {{ p.materiSelesai }}/{{ p.totalMateri }} Materi</span>
                <span>✍️ {{ p.tugasSelesai }}/{{ p.totalTugas }} Tugas</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="content-section">
          <h2>📋 Aktivitas Terbaru</h2>
          <div class="activity-list">
            <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
              <div class="activity-icon" :class="getActivityIconClass(activity.type)">
                {{ getActivityIcon(activity.type) }}
              </div>
              <div class="activity-content">
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.description }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
              <div class="activity-status" :class="getActivityStatusClass(activity.status)">
                {{ activity.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarSiswa from '../../components/NavbarSiswa.vue';

export default {
  name: 'DashboardSiswa',
  components: {
    SidebarSiswa
  },
  data() {
    return {
      sidebarCollapsed: false,
      stats: {
        materiDibaca: 12,
        tugasSelesai: 8,
        rataNilai: 8.7,
        jamBelajar: 24
      },
      materiList: [
        { 
          id: 1, 
          judul: "Matematika - Aljabar Dasar", 
          mataPelajaran: "Matematika",
          deskripsi: "Materi tentang konsep dasar aljabar dan persamaan linear",
          tanggal: "2024-01-15",
          guru: "Pak Budi"
        },
        { 
          id: 2, 
          judul: "Fisika - Hukum Newton", 
          mataPelajaran: "Fisika",
          deskripsi: "Pembahasan tentang tiga hukum Newton dan aplikasinya",
          tanggal: "2024-01-20",
          guru: "Pak Ahmad"
        },
        { 
          id: 3, 
          judul: "Kimia - Struktur Atom", 
          mataPelajaran: "Kimia",
          deskripsi: "Mempelajari struktur atom dan konfigurasi elektron",
          tanggal: "2024-01-25",
          guru: "Bu Siti"
        }
      ],
      tugasList: [
        { 
          id: 1, 
          judul: "Latihan Aljabar", 
          mataPelajaran: "Matematika",
          deskripsi: "Latihan soal aljabar dasar dengan 20 soal",
          deadline: "2024-02-01",
          durasi: "60 menit",
          guru: "Pak Budi",
          status: "belum_dikerjakan"
        },
        { 
          id: 2, 
          judul: "Laporan Fisika", 
          mataPelajaran: "Fisika",
          deskripsi: "Laporan praktikum hukum Newton",
          deadline: "2024-02-05",
          durasi: "120 menit",
          guru: "Pak Ahmad",
          status: "sedang_dikerjakan"
        },
        { 
          id: 3, 
          judul: "Quiz Kimia", 
          mataPelajaran: "Kimia",
          deskripsi: "Quiz tentang struktur atom dan tabel periodik",
          deadline: "2024-02-10",
          durasi: "45 menit",
          guru: "Bu Siti",
          status: "selesai"
        }
      ],
      jadwalList: [
        {
          id: 1,
          waktu: "07:00",
          durasi: 90,
          mataPelajaran: "Matematika",
          topik: "Aljabar Dasar",
          guru: "Pak Budi",
          status: "selesai"
        },
        {
          id: 2,
          waktu: "09:00",
          durasi: 90,
          mataPelajaran: "Fisika",
          topik: "Hukum Newton",
          guru: "Pak Ahmad",
          status: "sedang_berlangsung"
        },
        {
          id: 3,
          waktu: "11:00",
          durasi: 90,
          mataPelajaran: "Kimia",
          topik: "Struktur Atom",
          guru: "Bu Siti",
          status: "akan_datang"
        }
      ],
      progressList: [
        {
          id: 1,
          mataPelajaran: "Matematika",
          persentase: 85,
          materiSelesai: 17,
          totalMateri: 20,
          tugasSelesai: 8,
          totalTugas: 10
        },
        {
          id: 2,
          mataPelajaran: "Fisika",
          persentase: 72,
          materiSelesai: 14,
          totalMateri: 20,
          tugasSelesai: 6,
          totalTugas: 8
        },
        {
          id: 3,
          mataPelajaran: "Kimia",
          persentase: 90,
          materiSelesai: 18,
          totalMateri: 20,
          tugasSelesai: 9,
          totalTugas: 10
        }
      ],
      recentActivities: [
        {
          id: 1,
          type: 'materi',
          title: 'Materi Dibaca',
          description: 'Anda telah membaca materi "Aljabar Dasar"',
          time: '2 jam yang lalu',
          status: 'Selesai'
        },
        {
          id: 2,
          type: 'tugas',
          title: 'Tugas Dikerjakan',
          description: 'Tugas "Latihan Aljabar" telah selesai dikerjakan',
          time: '1 hari yang lalu',
          status: 'Selesai'
        },
        {
          id: 3,
          type: 'jadwal',
          title: 'Jadwal Diikuti',
          description: 'Mengikuti kelas Matematika pagi ini',
          time: '3 jam yang lalu',
          status: 'Selesai'
        },
        {
          id: 4,
          type: 'nilai',
          title: 'Nilai Diterima',
          description: 'Nilai tugas Fisika telah diterima',
          time: '2 hari yang lalu',
          status: 'Selesai'
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
        case 'viewMateri':
          this.$router.push('/siswa/materi');
          break;
        case 'startTugas':
          this.$router.push('/siswa/tugas');
          break;
        case 'checkSchedule':
          this.$router.push('/siswa/jadwal');
          break;
        case 'viewProgress':
          this.$router.push('/siswa/profil');
          break;
        case 'viewAllMateri':
          this.$router.push('/siswa/materi');
          break;
        case 'viewAllTugas':
          this.$router.push('/siswa/tugas');
          break;
        case 'viewAllSchedule':
          this.$router.push('/siswa/jadwal');
          break;
        case 'viewDetailedProgress':
          this.$router.push('/siswa/profil');
          break;
      }
    },
    viewMateri(materi) {
      this.$router.push(`/siswa/materi/${materi.id}`);
    },
    readMateri(materi) {
      this.$router.push(`/siswa/materi/${materi.id}/read`);
    },
    downloadMateri(materi) {
      // Implementasi download
    },
    viewTugas(tugas) {
      this.$router.push(`/siswa/tugas/${tugas.id}`);
    },
    startTugas(tugas) {
      this.$router.push(`/siswa/tugas/${tugas.id}/kerjakan`);
    },
    continueTugas(tugas) {
      this.$router.push(`/siswa/tugas/${tugas.id}/kerjakan`);
    },
    viewTugasResult(tugas) {
      this.$router.push(`/siswa/tugas/${tugas.id}/hasil`);
    },
    viewJadwal(jadwal) {
      this.$router.push('/siswa/jadwal');
    },
    viewSubjectProgress(progress) {
      this.$router.push(`/siswa/profil/progress/${progress.id}`);
    },
    getStatusClass(status) {
      const statusClasses = {
        'belum_dikerjakan': 'status-pending',
        'sedang_dikerjakan': 'status-progress',
        'selesai': 'status-success'
      };
      return statusClasses[status] || 'status-pending';
    },
    getStatusText(status) {
      const statusTexts = {
        'belum_dikerjakan': 'Belum Dikerjakan',
        'sedang_dikerjakan': 'Sedang Dikerjakan',
        'selesai': 'Selesai'
      };
      return statusTexts[status] || 'Belum Dikerjakan';
    },
    getJadwalStatusClass(status) {
      const statusClasses = {
        'selesai': 'jadwal-selesai',
        'sedang_berlangsung': 'jadwal-aktif',
        'akan_datang': 'jadwal-mendatang'
      };
      return statusClasses[status] || 'jadwal-mendatang';
    },
    getActivityIcon(type) {
      const icons = {
        'materi': '📖',
        'tugas': '✍️',
        'jadwal': '📅',
        'nilai': '📊'
      };
      return icons[type] || '📋';
    },
    getActivityIconClass(type) {
      const classes = {
        'materi': 'icon-materi',
        'tugas': 'icon-tugas',
        'jadwal': 'icon-jadwal',
        'nilai': 'icon-nilai'
      };
      return classes[type] || '';
    },
    getActivityStatusClass(status) {
      return status === 'Selesai' ? 'status-success' : 'status-pending';
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  background: var(--bg);
  min-height: 100vh;
}

.main-content.sidebar-collapsed {
  margin-left: 80px;
}

.siswa-dashboard {
  margin: 0;
  max-width: none;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #6366f1, #3730a3);
  color: white;
  border-radius: var(--radius);
}

.welcome-section h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.welcome-text {
  font-size: 1.1rem;
  opacity: 0.95;
  color: white;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: var(--radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-color: #6366f1;
}

.stat-icon {
  font-size: 2.2rem;
  background: linear-gradient(135deg, #6366f1, #3730a3);
  color: white;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content h3 {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #22223b;
}

.content-section {
  background: #fff;
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  color: #22223b;
  font-size: 1.4rem;
  font-weight: 600;
}

.btn-primary {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #3730a3;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #059669;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #047857;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: #6366f1;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #f3f4f6;
  color: #3730a3;
  border-color: #6366f1;
}

.materi-grid,
.tugas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.5rem;
}

.materi-card,
.tugas-card {
  background: #f8fafc;
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.materi-card:hover,
.tugas-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-color: #6366f1;
}

.materi-header,
.tugas-header {
  margin-bottom: 1rem;
}

.materi-header h3,
.tugas-header h3 {
  color: #22223b;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.materi-subject,
.tugas-subject {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.materi-desc,
.tugas-desc {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.materi-meta,
.tugas-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.materi-meta span,
.tugas-meta span {
  font-size: 0.85rem;
  color: #64748b;
}

.tugas-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-align: center;
}

.status-pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-progress {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.status-success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.materi-actions,
.tugas-actions {
  display: flex;
  gap: 0.75rem;
}

.jadwal-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.jadwal-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: var(--radius);
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.jadwal-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-color: #6366f1;
}

.jadwal-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.time {
  font-size: 1.1rem;
  font-weight: 600;
  color: #22223b;
}

.duration {
  font-size: 0.8rem;
  color: #64748b;
}

.jadwal-content {
  flex: 1;
}

.jadwal-content h4 {
  color: #22223b;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.jadwal-content p {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.guru {
  font-size: 0.8rem;
  color: #64748b;
}

.jadwal-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}

.jadwal-selesai {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.jadwal-aktif {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}

.jadwal-mendatang {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.progress-card {
  background: #f8fafc;
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.progress-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-color: #6366f1;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-header h4 {
  color: #22223b;
  font-size: 1.1rem;
  font-weight: 600;
}

.progress-percentage {
  color: #6366f1;
  font-weight: 600;
  font-size: 1.1rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 6px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #3730a3);
  border-radius: 6px;
  transition: width 0.3s ease;
}

.progress-details {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.progress-details span {
  font-size: 0.9rem;
  color: #64748b;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: var(--radius);
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.activity-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border-color: #6366f1;
}

.activity-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e7ff;
  color: #6366f1;
}

.icon-materi { background: #bbf7d0; color: #22c55e; }
.icon-tugas { background: #fef9c3; color: #f59e0b; }
.icon-jadwal { background: #dbeafe; color: #2563eb; }
.icon-nilai { background: #ede9fe; color: #a21caf; }

.activity-content {
  flex: 1;
}

.activity-content h4 {
  color: #22223b;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.activity-content p {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.activity-time {
  color: #64748b;
  font-size: 0.8rem;
}

.activity-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.status-pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
  .siswa-dashboard {
    padding: 1rem;
  }
  .welcome-section h1 {
    font-size: 2rem;
  }
  .stats-section {
    grid-template-columns: 1fr;
  }
  .materi-grid,
  .tugas-grid {
    grid-template-columns: 1fr;
  }
  .progress-grid {
    grid-template-columns: 1fr;
  }
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  .jadwal-item {
    flex-direction: column;
    text-align: center;
  }
  .jadwal-time {
    min-width: auto;
  }
}
</style>
