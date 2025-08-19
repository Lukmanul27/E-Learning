<template>
  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />
    
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container admin-dashboard">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <h1>👨‍💼 Dashboard Admin</h1>
          <p class="welcome-text">Selamat datang, Admin! Kelola sistem E-Learning dengan baik.</p>
        </div>

        <!-- Statistik Ringkas -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <h3>Total Users</h3>
              <div class="stat-number">{{ stats.totalUsers }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👨‍🏫</div>
            <div class="stat-content">
              <h3>Total Guru</h3>
              <div class="stat-number">{{ stats.totalGuru }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👨‍🎓</div>
            <div class="stat-content">
              <h3>Total Siswa</h3>
              <div class="stat-number">{{ stats.totalSiswa }}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h3>Total Materi</h3>
              <div class="stat-number">{{ stats.totalMateri }}</div>
            </div>
          </div>
        </div>

        <!-- User Management -->
        <div class="content-section">
          <div class="section-header">
            <h2>👥 Manajemen User</h2>
            <button class="btn-primary" @click="handleAction('tambahUser')">+ Tambah User</button>
          </div>
          <div class="user-grid">
            <div v-for="user in userList" :key="user.id" class="user-card" @click="viewUser(user)">
              <div class="user-header">
                <div class="user-avatar">{{ user.avatar }}</div>
                <div class="user-info">
                  <h3>{{ user.nama }}</h3>
                  <span class="user-role" :class="getRoleClass(user.role)">{{ user.role }}</span>
                </div>
              </div>
              <div class="user-details">
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Status:</strong> 
                  <span class="status-badge" :class="getStatusClass(user.status)">
                    {{ user.status }}
                  </span>
                </p>
                <p><strong>Terdaftar:</strong> {{ user.terdaftar }}</p>
              </div>
              <div class="user-actions">
                <button class="btn-secondary" @click.stop="editUser(user)">Edit</button>
                <button class="btn-outline" @click.stop="viewUser(user)">Lihat</button>
                <button 
                  v-if="user.status === 'active'" 
                  class="btn-danger" 
                  @click.stop="deactivateUser(user)"
                >
                  Nonaktifkan
                </button>
                <button 
                  v-else 
                  class="btn-success" 
                  @click.stop="activateUser(user)"
                >
                  Aktifkan
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- System Overview -->
        <div class="content-section">
          <div class="section-header">
            <h2>📊 Overview Sistem</h2>
            <button class="btn-outline" @click="handleAction('refreshStats')">🔄 Refresh</button>
          </div>
          <div class="overview-grid">
            <div class="overview-card">
              <h3>📈 Aktivitas Hari Ini</h3>
              <div class="overview-stats">
                <div class="overview-stat">
                  <span class="stat-label">Login</span>
                  <span class="stat-value">{{ overview.todayLogin }}</span>
                </div>
                <div class="overview-stat">
                  <span class="stat-label">Materi Dibaca</span>
                  <span class="stat-value">{{ overview.todayMateri }}</span>
                </div>
                <div class="overview-stat">
                  <span class="stat-label">Tugas Dikumpulkan</span>
                  <span class="stat-value">{{ overview.todayTugas }}</span>
                </div>
              </div>
            </div>
            <div class="overview-card">
              <h3>⚠️ Peringatan Sistem</h3>
              <div class="warning-list">
                <div v-for="warning in overview.warnings" :key="warning.id" class="warning-item">
                  <span class="warning-icon">{{ warning.icon }}</span>
                  <span class="warning-text">{{ warning.message }}</span>
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
import SidebarAdmin from '../../components/NavbarAdmin.vue';

export default {
  name: 'DashboardAdmin',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      stats: {
        totalUsers: 156,
        totalGuru: 24,
        totalSiswa: 120,
        totalMateri: 89
      },
      userList: [
        {
          id: 1,
          nama: 'Pak Budi Santoso',
          email: 'budi.santoso@school.edu',
          role: 'guru',
          status: 'active',
          terdaftar: '2024-01-01',
          avatar: '👨‍🏫'
        },
        {
          id: 2,
          nama: 'Ani Wijaya',
          email: 'ani.wijaya@school.edu',
          role: 'siswa',
          status: 'active',
          terdaftar: '2024-01-02',
          avatar: '👨‍🎓'
        },
        {
          id: 3,
          nama: 'Siti Nurhaliza',
          email: 'siti.nurhaliza@school.edu',
          role: 'operator',
          status: 'inactive',
          terdaftar: '2024-01-03',
          avatar: '👩‍💼'
        }
      ],
      overview: {
        todayLogin: 89,
        todayMateri: 45,
        todayTugas: 23,
        warnings: [
          {
            id: 1,
            icon: '⚠️',
            message: 'Server load tinggi - 85%'
          },
          {
            id: 2,
            icon: '💾',
            message: 'Storage tersisa 15%'
          }
        ]
      },
      recentActivities: [
        {
          id: 1,
          icon: '👥',
          title: 'User Baru Ditambahkan',
          description: 'Guru baru "Pak Ahmad" telah ditambahkan ke sistem',
          time: '1 jam yang lalu'
        },
        {
          id: 2,
          icon: '🔒',
          title: 'Password Reset',
          description: 'Password untuk user "siti.nurhaliza@school.edu" telah direset',
          time: '2 jam yang lalu'
        },
        {
          id: 3,
          icon: '📊',
          title: 'Backup Database',
          description: 'Backup database harian telah berhasil dibuat',
          time: '6 jam yang lalu'
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
        case 'tambahUser':
          this.$router.push('/admin/users/tambah');
          break;
        case 'refreshStats':
          this.refreshSystemStats();
          break;
        case 'lihatSemuaAktivitas':
          this.$router.push('/admin/activities');
          break;
        default:
          console.log('Action:', action);
      }
    },
    viewUser(user) {
      this.$router.push(`/admin/users/${user.id}`);
    },
    editUser(user) {
      this.$router.push(`/admin/users/edit/${user.id}`);
    },
    activateUser(user) {
      if (confirm(`Aktifkan user ${user.nama}?`)) {
        user.status = 'active';
        // API call to activate user
      }
    },
    deactivateUser(user) {
      if (confirm(`Nonaktifkan user ${user.nama}?`)) {
        user.status = 'inactive';
        // API call to deactivate user
      }
    },
    getRoleClass(role) {
      const roleClasses = {
        'admin': 'role-admin',
        'guru': 'role-guru',
        'siswa': 'role-siswa',
        'operator': 'role-operator'
      };
      return roleClasses[role] || 'role-default';
    },
    getStatusClass(status) {
      return status === 'active' ? 'status-active' : 'status-inactive';
    },
    refreshSystemStats() {
      // API call to refresh stats
      console.log('Refreshing system stats...');
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
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
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
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

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.user-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.user-card:hover {
  border-color: #dc2626;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.user-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.user-avatar {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
}

.user-info h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.user-role {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.role-admin {
  background: #dc2626;
  color: white;
}

.role-guru {
  background: #059669;
  color: white;
}

.role-siswa {
  background: #3b82f6;
  color: white;
}

.role-operator {
  background: #7c3aed;
  color: white;
}

.user-details {
  margin-bottom: 1rem;
}

.user-details p {
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

.user-actions {
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
  background: #dc2626;
  color: white;
}

.btn-primary:hover {
  background: #b91c1c;
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
  color: #dc2626;
  border: 1px solid #dc2626;
}

.btn-outline:hover {
  background: #dc2626;
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

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.overview-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
}

.overview-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.overview-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.overview-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.overview-stat:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.warning-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.warning-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #fef3c7;
  border-radius: 6px;
  border: 1px solid #fde68a;
}

.warning-icon {
  font-size: 1.25rem;
}

.warning-text {
  font-size: 0.875rem;
  color: #92400e;
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
  background: #dc2626;
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
  .admin-dashboard {
    padding: 1rem;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
  }
  
  .user-grid {
    grid-template-columns: 1fr;
  }
  
  .overview-grid {
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
  
  .user-actions {
    flex-direction: column;
  }
}
</style>