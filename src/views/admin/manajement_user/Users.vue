<template>

  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />

    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container admin-users">
        <!-- Header Section -->
        <div class="page-header">
          <h1>👥 Manajemen User</h1>
          <p class="page-description">Kelola semua user dalam sistem E-Learning</p>
        </div>

        <!-- Action Bar -->
        <div class="action-bar">
          <div class="search-section">
            <input type="text" v-model="searchQuery" placeholder="Cari user..." class="search-input" />
            <button class="search-btn">🔍</button>
          </div>
          <div class="filter-section">
            <select v-model="roleFilter" class="filter-select">
              <option value="">Semua Role</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="guru">Guru</option>
              <option value="siswa">Siswa</option>
            </select>
            <select v-model="statusFilter" class="filter-select">
              <option value="">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
          <button class="btn-primary" @click="showAddUserModal = true">
            <span>➕</span>
            Tambah User
          </button>
        </div>

        <!-- Users Table -->
        <div class="users-table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Terdaftar</th>
                <th>Terakhir Login</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <div class="user-avatar">
                    <!-- Gunakan v-if/v-else agar tidak error di CSS parser -->
                    <span v-if="user.avatar">{{ user.avatar }}</span>
                    <span v-else>👤</span>
                  </div>
                </td>
                <td>
                  <div class="user-info">
                    <strong>{{ user.nama }}</strong>
                    <span class="user-id">ID: {{ user.id }}</span>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge" :class="getRoleClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <span class="status-badge" :class="getStatusClass(user.status)">
                    {{ user.status }}
                  </span>
                </td>
                <td>{{ formatDate(user.terdaftar) }}</td>
                <td>{{ formatDate(user.terakhirLogin) }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-icon" @click="viewUser(user)" title="Lihat">
                      👁️
                    </button>
                    <button class="btn-icon" @click="editUser(user)" title="Edit">
                      ✏️
                    </button>
                    <button v-if="user.status === 'active'" class="btn-icon btn-danger" @click="deactivateUser(user)"
                      title="Nonaktifkan">
                      🚫
                    </button>
                    <button v-else class="btn-icon btn-success" @click="activateUser(user)" title="Aktifkan">
                      ✅
                    </button>
                    <button class="btn-icon btn-warning" @click="resetPassword(user)" title="Reset Password">
                      🔑
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="btn-outline" :disabled="currentPage === 1" @click="changePage(-1)">
            ← Sebelumnya
          </button>
          <span class="page-info">Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button class="btn-outline" :disabled="currentPage === totalPages" @click="changePage(1)">
            Selanjutnya →
          </button>
        </div>
      </div>
    </main>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="modal-overlay" @click="showAddUserModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>➕ Tambah User Baru</h2>
          <button class="modal-close" @click="showAddUserModal = false">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addUser">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input type="text" v-model="newUser.nama" required class="form-input" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="newUser.email" required class="form-input" />
            </div>
            <div class="form-group">
              <label>Role</label>
              <select v-model="newUser.role" required class="form-input">
                <option value="">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="operator">Operator</option>
                <option value="guru">Guru</option>
                <option value="siswa">Siswa</option>
              </select>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" v-model="newUser.password" required class="form-input" />
            </div>
            <div class="form-actions">
              <button type="button" class="btn-outline" @click="showAddUserModal = false">
                Batal
              </button>
              <button type="submit" class="btn-primary">
                Tambah User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from '../../../components/NavbarAdmin.vue';

export default {
  name: 'AdminUsers',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      searchQuery: '',
      roleFilter: '',
      statusFilter: '',
      currentPage: 1,
      itemsPerPage: 10,
      showAddUserModal: false,
      newUser: {
        nama: '',
        email: '',
        role: '',
        password: ''
      },
      users: [
        {
          id: 1,
          nama: 'Pak Budi Santoso',
          email: 'budi.santoso@school.edu',
          role: 'guru',
          status: 'active',
          terdaftar: '2024-01-01',
          terakhirLogin: '2024-01-15',
          avatar: '👨‍🏫'
        },
        {
          id: 2,
          nama: 'Ani Wijaya',
          email: 'ani.wijaya@school.edu',
          role: 'siswa',
          status: 'active',
          terdaftar: '2024-01-02',
          terakhirLogin: '2024-01-15',
          avatar: '👨‍🎓'
        },
        {
          id: 3,
          nama: 'Siti Nurhaliza',
          email: 'siti.nurhaliza@school.edu',
          role: 'operator',
          status: 'inactive',
          terdaftar: '2024-01-03',
          terakhirLogin: '2024-01-10',
          avatar: '👩‍💼'
        },
        {
          id: 4,
          nama: 'Admin Utama',
          email: 'admin@school.edu',
          role: 'admin',
          status: 'active',
          terdaftar: '2024-01-01',
          terakhirLogin: '2024-01-15',
          avatar: '👨‍💼'
        }
      ]
    }
  },
  computed: {
    filteredUsers() {
      let filtered = this.users;

      if (this.searchQuery) {
        filtered = filtered.filter(user =>
          user.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.roleFilter) {
        filtered = filtered.filter(user => user.role === this.roleFilter);
      }

      if (this.statusFilter) {
        filtered = filtered.filter(user => user.status === this.statusFilter);
      }

      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    }
  },
  methods: {
    handleSidebarChange(data) {
      this.sidebarCollapsed = data.collapsed;
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
    formatDate(dateString) {
      if (!dateString) return '-';
      return new Date(dateString).toLocaleDateString('id-ID');
    },
    viewUser(user) {
      console.log('View user:', user);
      // Navigate to user detail page
    },
    editUser(user) {
      console.log('Edit user:', user);
      // Navigate to edit user page
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
    resetPassword(user) {
      if (confirm(`Reset password untuk ${user.nama}?`)) {
        // API call to reset password
        alert('Password telah direset dan dikirim ke email user');
      }
    },
    changePage(delta) {
      const newPage = this.currentPage + delta;
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
      }
    },
    addUser() {
      // Validate form
      if (!this.newUser.nama || !this.newUser.email || !this.newUser.role || !this.newUser.password) {
        alert('Semua field harus diisi');
        return;
      }

      // Create new user object
      const user = {
        id: this.users.length + 1,
        nama: this.newUser.nama,
        email: this.newUser.email,
        role: this.newUser.role,
        status: 'active',
        terdaftar: new Date().toISOString().split('T')[0],
        terakhirLogin: null,
        avatar: this.getAvatarForRole(this.newUser.role)
      };

      // Add to users array
      this.users.push(user);

      // Reset form and close modal
      this.newUser = { nama: '', email: '', role: '', password: '' };
      this.showAddUserModal = false;

      alert('User berhasil ditambahkan!');
    },
    getAvatarForRole(role) {
      const avatars = {
        'admin': '👨‍💼',
        'guru': '👨‍🏫',
        'siswa': '👨‍🎓',
        'operator': '👩‍💼'
      };
      // Default avatar is '👤'
      return avatars[role] || '👤';
    }
  }
}
</script>

<style scoped>
.admin-users {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.page-description {
  color: #6b7280;
  font-size: 1.1rem;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 300px;
}

.search-btn {
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}

.filter-section {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
}

.btn-primary {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.btn-primary:hover {
  background: #b91c1c;
}

.users-table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 2rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  background: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.users-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.users-table tr:hover {
  background: #f9fafb;
}

.user-avatar {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-id {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.role-badge {
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

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f3f4f6;
}

.btn-danger:hover {
  background: #fef2f2;
}

.btn-success:hover {
  background: #dcfce7;
}

.btn-warning:hover {
  background: #fef3c7;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.page-info {
  color: #6b7280;
  font-size: 0.875rem;
}

.btn-outline {
  background: transparent;
  color: #dc2626;
  border: 1px solid #dc2626;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover:not(:disabled) {
  background: #dc2626;
  color: white;
}

.btn-outline:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  color: #111827;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-users {
    padding: 1rem;
  }

  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    min-width: auto;
  }

  .users-table {
    font-size: 0.875rem;
  }

  .users-table th,
  .users-table td {
    padding: 0.5rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>