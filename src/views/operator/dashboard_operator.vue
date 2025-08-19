<template>
  <div class="dashboard-layout">
    <SidebarOperator @sidebar-change="handleSidebarChange" />
    
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container operator-dashboard">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1>👩‍💼 Dashboard Operator</h1>
          <p class="welcome-text">Selamat datang, Operator! Kelola data dan sistem dengan efisien.</p>
        </div>

        <!-- Statistik Ringkas -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <h3>Total Kelas</h3>
              <div class="stat-number">{{ stats.totalKelas }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h3>Total Mata Pelajaran</h3>
              <div class="stat-number">{{ stats.totalMataPelajaran }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👨‍🏫</div>
            <div class="stat-content">
              <h3>Guru Aktif</h3>
              <div class="stat-number">{{ stats.guruAktif }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👨‍🎓</div>
            <div class="stat-content">
              <h3>Siswa Aktif</h3>
              <div class="stat-number">{{ stats.siswaAktif }}</div>
            </div>
          </div>
        </div>

        <!-- Manajemen Kelas -->
        <div class="content-section">
          <div class="section-header">
            <h2>🏫 Manajemen Kelas</h2>
            <button class="btn-primary" @click="handleAction('tambahKelas')">+ Tambah Kelas</button>
          </div>
          <div class="kelas-grid">
            <div v-for="kelas in kelasList" :key="kelas.id" class="kelas-card" @click="viewKelas(kelas)">
              <div class="kelas-header">
                <h3>{{ kelas.nama }}</h3>
                <span class="kelas-level">{{ kelas.level }}</span>
              </div>
              <div class="kelas-details">
                <p><strong>Wali Kelas:</strong> {{ kelas.waliKelas }}</p>
                <p><strong>Jumlah Siswa:</strong> {{ kelas.jumlahSiswa }} orang</p>
                <p><strong>Mata Pelajaran:</strong> {{ kelas.mataPelajaran.join(', ') }}</p>
                <p><strong>Status:</strong> 
                  <span class="status-badge" :class="getStatusClass(kelas.status)">
                    {{ kelas.status }}
                  </span>
                </p>
              </div>
              <div class="kelas-actions">
                <button class="btn-secondary" @click.stop="editKelas(kelas)">Edit</button>
                <button class="btn-outline" @click.stop="viewKelas(kelas)">Lihat Detail</button>
                <button 
                  v-if="kelas.status === 'active'" 
                  class="btn-danger" 
                  @click.stop="deactivateKelas(kelas)"
                >
                  Nonaktifkan
                </button>
                <button 
                  v-else 
                  class="btn-success" 
                  @click.stop="activateKelas(kelas)"
                >
                  Aktifkan
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Manajemen Mata Pelajaran -->
        <div class="content-section">
          <div class="section-header">
            <h2>📚 Manajemen Mata Pelajaran</h2>
            <button class="btn-primary" @click="handleAction('tambahMataPelajaran')">+ Tambah Mata Pelajaran</button>
          </div>
          <div class="mata-pelajaran-grid">
            <div v-for="mapel in mataPelajaranList" :key="mapel.id" class="mapel-card" @click="viewMataPelajaran(mapel)">
              <div class="mapel-header">
                <h3>{{ mapel.nama }}</h3>
                <span class="mapel-kode">{{ mapel.kode }}</span>
              </div>
              <div class="mapel-details">
                <p><strong>Guru Pengampu:</strong> {{ mapel.guruPengampu }}</p>
                <p><strong>Semester:</strong> {{ mapel.semester }}</p>
                <p><strong>Jumlah SKS:</strong> {{ mapel.sks }} SKS</p>
                <p><strong>Status:</strong> 
                  <span class="status-badge" :class="getStatusClass(mapel.status)">
                    {{ mapel.status }}
                  </span>
                </p>
              </div>
              <div class="mapel-actions">
                <button class="btn-secondary" @click.stop="editMataPelajaran(mapel)">Edit</button>
                <button class="btn-outline" @click.stop="viewMataPelajaran(mapel)">Lihat Detail</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sistem Monitoring -->
        <div class="content-section">
          <div class="section-header">
            <h2>📊 Monitoring Sistem</h2>
            <button class="btn-outline" @click="handleAction('refreshMonitoring')">🔄 Refresh</button>
          </div>
          <div class="monitoring-grid">
            <div class="monitoring-card">
              <h3>💻 Status Server</h3>
              <div class="server-status">
                <div class="status-item">
                  <span class="status-label">Web Server</span>
                  <span class="status-value" :class="getServerStatusClass(monitoring.webServer)">
                    {{ monitoring.webServer }}
                  </span>
                </div>
                <div class="status-item">
                  <span class="status-label">Database</span>
                  <span class="status-value" :class="getServerStatusClass(monitoring.database)">
                    {{ monitoring.database }}
                  </span>
                </div>
                <div class="status-item">
                  <span class="status-label">Storage</span>
                  <span class="status-value" :class="getStorageStatusClass(monitoring.storage)">
                    {{ monitoring.storage }}%
                  </span>
                </div>
              </div>
            </div>
            <div class="monitoring-card">
              <h3>📈 Aktivitas Hari Ini</h3>
              <div class="activity-stats">
                <div class="activity-stat">
                  <span class="stat-label">Login User</span>
                  <span class="stat-value">{{ monitoring.todayLogin }}</span>
                </div>
                <div class="activity-stat">
                  <span class="stat-label">Upload File</span>
                  <span class="stat-value">{{ monitoring.todayUpload }}</span>
                </div>
                <div class="activity-stat">
                  <span class="stat-label">Download</span>
                  <span class="stat-value">{{ monitoring.todayDownload }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
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
import SidebarOperator from '../../components/NavbarOperator.vue';

export default {
  name: 'DashboardOperator',
  components: {
    SidebarOperator
  },
  data() {
    return {
      sidebarCollapsed: false,
      stats: {
        totalKelas: 12,
        totalMataPelajaran: 18,
        guruAktif: 24,
        siswaAktif: 320
      },
      kelasList: [
        {
          id: 1,
          nama: 'Kelas X-A',
          level: 'X',
          waliKelas: 'Pak Budi Santoso',
          jumlahSiswa: 32,
          mataPelajaran: ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris'],
          status: 'active'
        },
        {
          id: 2,
          nama: 'Kelas XI-IPA-1',
          level: 'XI',
          waliKelas: 'Bu Siti Aminah',
          jumlahSiswa: 28,
          mataPelajaran: ['Fisika', 'Kimia', 'Biologi'],
          status: 'active'
        },
        {
          id: 3,
          nama: 'Kelas XII-IPS-2',
          level: 'XII',
          waliKelas: 'Pak Ahmad Hidayat',
          jumlahSiswa: 30,
          mataPelajaran: ['Ekonomi', 'Sosiologi', 'Geografi'],
          status: 'inactive'
        }
      ],
      mataPelajaranList: [
        {
          id: 1,
          nama: 'Matematika Dasar',
          kode: 'MTK001',
          guruPengampu: 'Pak Budi Santoso',
          semester: 'Ganjil',
          sks: 3,
          status: 'active'
        },
        {
          id: 2,
          nama: 'Bahasa Indonesia',
          kode: 'BIN001',
          guruPengampu: 'Bu Siti Aminah',
          semester: 'Ganjil',
          sks: 2,
          status: 'active'
        },
        {
          id: 3,
          nama: 'Fisika Dasar',
          kode: 'FIS001',
          guruPengampu: 'Pak Ahmad Hidayat',
          semester: 'Ganjil',
          sks: 3,
          status: 'active'
        }
      ],
      monitoring: {
        webServer: 'Online',
        database: 'Online',
        storage: 75,
        todayLogin: 156,
        todayUpload: 23,
        todayDownload: 89
      },
      recentActivities: [
        {
          id: 1,
          icon: '🏫',
          title: 'Kelas Baru Ditambahkan',
          description: 'Kelas "XII-IPA-3" telah ditambahkan ke sistem',
          time: '2 jam yang lalu'
        },
        {
          id: 2,
          icon: '📚',
          title: 'Mata Pelajaran Diperbarui',
          description: 'Mata pelajaran "Matematika Lanjutan" telah diperbarui',
          time: '4 jam yang lalu'
        },
        {
          id: 3,
          icon: '👥',
          title: 'Data Siswa Diimpor',
          description: '150 data siswa baru telah berhasil diimpor',
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
        case 'tambahKelas':
          this.$router.push('/operator/kelas/tambah');
          break;
        case 'tambahMataPelajaran':
          this.$router.push('/operator/mata-pelajaran/tambah');
          break;
        case 'refreshMonitoring':
          this.refreshSystemMonitoring();
          break;
        case 'lihatSemuaAktivitas':
          this.$router.push('/operator/activities');
          break;
        default:
          console.log('Action:', action);
      }
    },
    viewKelas(kelas) {
      this.$router.push(`/operator/kelas/${kelas.id}`);
    },
    editKelas(kelas) {
      this.$router.push(`/operator/kelas/edit/${kelas.id}`);
    },
    activateKelas(kelas) {
      if (confirm(`Aktifkan kelas ${kelas.nama}?`)) {
        kelas.status = 'active';
        // API call to activate kelas
      }
    },
    deactivateKelas(kelas) {
      if (confirm(`Nonaktifkan kelas ${kelas.nama}?`)) {
        kelas.status = 'inactive';
        // API call to deactivate kelas
      }
    },
    viewMataPelajaran(mapel) {
      this.$router.push(`/operator/mata-pelajaran/${mapel.id}`);
    },
    editMataPelajaran(mapel) {
      this.$router.push(`/operator/mata-pelajaran/edit/${mapel.id}`);
    },
    getStatusClass(status) {
      return status === 'active' ? 'status-active' : 'status-inactive';
    },
    getServerStatusClass(status) {
      return status === 'Online' ? 'status-online' : 'status-offline';
    },
    getStorageStatusClass(percentage) {
      if (percentage >= 80) return 'status-danger';
      if (percentage >= 60) return 'status-warning';
      return 'status-safe';
    },
    refreshSystemMonitoring() {
      // API call to refresh monitoring data
      console.log('Refreshing system monitoring...');
    }
  }
}
</script>

<style scoped>
.operator-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
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

.kelas-grid,
.mata-pelajaran-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.kelas-card,
.mapel-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.kelas-card:hover,
.mapel-card:hover {
  border-color: #7c3aed;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.kelas-header,
.mapel-header {
  margin-bottom: 1rem;
}

.kelas-header h3,
.mapel-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.kelas-level,
.mapel-kode {
  background: #7c3aed;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.kelas-details,
.mapel-details {
  margin-bottom: 1rem;
}

.kelas-details p,
.mapel-details p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-inactive {
  background: #fef2f2;
  color: #dc2626;
}

.kelas-actions,
.mapel-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-outline,
.btn-danger,
.btn-success {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: #7c3aed;
  color: white;
}

.btn-primary:hover {
  background: #6d28d9;
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
  color: #7c3aed;
  border: 1px solid #7c3aed;
}

.btn-outline:hover {
  background: #7c3aed;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-success {
  background: #22c55e;
  color: white;
}

.btn-success:hover {
  background: #16a34a;
}

.monitoring-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.monitoring-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
}

.monitoring-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.server-status,
.activity-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-item,
.activity-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.status-item:last-child,
.activity-stat:last-child {
  border-bottom: none;
}

.status-label,
.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.status-value,
.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
}

.status-online {
  color: #16a34a;
}

.status-offline {
  color: #dc2626;
}

.status-safe {
  color: #16a34a;
}

.status-warning {
  color: #d97706;
}

.status-danger {
  color: #dc2626;
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
  background: #7c3aed;
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
  .operator-dashboard {
    padding: 1rem;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .kelas-grid,
  .mata-pelajaran-grid {
    grid-template-columns: 1fr;
  }
  
  .monitoring-grid {
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
  
  .kelas-actions,
  .mapel-actions {
    flex-direction: column;
  }
}
</style>
