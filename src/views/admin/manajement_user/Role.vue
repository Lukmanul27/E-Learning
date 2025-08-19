<template>
  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />

    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="admin-roles">
        <!-- Header Section -->
        <div class="page-header">
          <h1>🔑 Manajemen Role</h1>
          <p class="page-description">Kelola role dan hak akses user dalam sistem E-Learning</p>
        </div>

        <!-- Action Bar -->
        <div class="action-bar">
          <div class="action-bar-left">
            <div class="search-section">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Cari role..."
                class="search-input"
              />
              <button class="search-btn">🔍</button>
            </div>
          </div>
          <div class="action-bar-right">
            <button class="btn-primary" @click="showAddRoleModal = true">
              <span>➕</span>
              Tambah Role
            </button>
          </div>
        </div>

        <!-- Roles Table -->
        <div class="table-container">
          <table class="main-table">
            <thead>
              <tr>
                <th>Nama Role</th>
                <th>Deskripsi</th>
                <th>Jumlah User</th>
                <th>Hak Akses</th>
                <th style="text-align:center;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in filteredRoles" :key="role.id">
                <td>
                  <span class="role-badge" :class="getRoleClass(role.name)">
                    {{ role.name }}
                  </span>
                </td>
                <td>{{ role.description }}</td>
                <td>{{ role.userCount }}</td>
                <td>
                  <ul class="permission-list">
                    <li v-for="perm in role.permissions" :key="perm">
                      <span class="permission-badge">{{ perm }}</span>
                    </li>
                  </ul>
                </td>
                <td style="text-align:center;">
                  <div class="action-buttons">
                    <button class="btn-icon" @click="editRole(role)" title="Edit">
                      ✏️
                    </button>
                    <button class="btn-icon btn-danger" @click="deleteRole(role)" title="Hapus">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredRoles.length === 0">
                <td colspan="5" style="text-align:center; color:#888;">Tidak ada data role.</td>
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

    <!-- Add/Edit Role Modal -->
    <div v-if="showAddRoleModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editMode ? '✏️ Edit Role' : '➕ Tambah Role Baru' }}</h2>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editMode ? updateRole() : addRole()">
            <div class="form-group">
              <label>Nama Role</label>
              <input type="text" v-model="roleForm.name" required class="form-input" />
            </div>
            <div class="form-group">
              <label>Deskripsi</label>
              <input type="text" v-model="roleForm.description" required class="form-input" />
            </div>
            <div class="form-group">
              <label>Hak Akses</label>
              <div class="permission-checkboxes">
                <label v-for="perm in allPermissions" :key="perm" class="checkbox-label">
                  <input
                    type="checkbox"
                    :value="perm"
                    v-model="roleForm.permissions"
                  />
                  {{ perm }}
                </label>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-outline" @click="closeModal">
                Batal
              </button>
              <button type="submit" class="btn-primary">
                {{ editMode ? 'Simpan Perubahan' : 'Tambah Role' }}
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
  name: 'AdminRoles',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 8,
      showAddRoleModal: false,
      editMode: false,
      editingRoleId: null,
      allPermissions: [
        'Lihat User', 'Tambah User', 'Edit User', 'Hapus User',
        'Lihat Materi', 'Tambah Materi', 'Edit Materi', 'Hapus Materi',
        'Lihat Tugas', 'Tambah Tugas', 'Edit Tugas', 'Hapus Tugas',
        'Kelola Role', 'Kelola Sistem'
      ],
      roleForm: {
        name: '',
        description: '',
        permissions: []
      },
      roles: [
        {
          id: 1,
          name: 'admin',
          description: 'Administrator sistem, akses penuh',
          userCount: 3,
          permissions: [
            'Lihat User', 'Tambah User', 'Edit User', 'Hapus User',
            'Lihat Materi', 'Tambah Materi', 'Edit Materi', 'Hapus Materi',
            'Lihat Tugas', 'Tambah Tugas', 'Edit Tugas', 'Hapus Tugas',
            'Kelola Role', 'Kelola Sistem'
          ]
        },
        {
          id: 2,
          name: 'operator',
          description: 'Operator sekolah, kelola data user & materi',
          userCount: 5,
          permissions: [
            'Lihat User', 'Tambah User', 'Edit User',
            'Lihat Materi', 'Tambah Materi', 'Edit Materi'
          ]
        },
        {
          id: 3,
          name: 'guru',
          description: 'Guru, kelola materi & tugas',
          userCount: 24,
          permissions: [
            'Lihat Materi', 'Tambah Materi', 'Edit Materi',
            'Lihat Tugas', 'Tambah Tugas', 'Edit Tugas'
          ]
        },
        {
          id: 4,
          name: 'siswa',
          description: 'Siswa, akses materi & tugas',
          userCount: 120,
          permissions: [
            'Lihat Materi', 'Lihat Tugas'
          ]
        }
      ]
    }
  },
  computed: {
    filteredRoles() {
      let filtered = this.roles;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(role =>
          role.name.toLowerCase().includes(q) ||
          role.description.toLowerCase().includes(q)
        );
      }
      // Pagination
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return filtered.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      let filtered = this.roles;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        filtered = filtered.filter(role =>
          role.name.toLowerCase().includes(q) ||
          role.description.toLowerCase().includes(q)
        );
      }
      return Math.ceil(filtered.length / this.itemsPerPage) || 1;
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
    changePage(delta) {
      const newPage = this.currentPage + delta;
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
      }
    },
    closeModal() {
      this.showAddRoleModal = false;
      this.editMode = false;
      this.editingRoleId = null;
      this.roleForm = { name: '', description: '', permissions: [] };
    },
    addRole() {
      if (!this.roleForm.name || !this.roleForm.description) {
        alert('Nama dan deskripsi role harus diisi');
        return;
      }
      const exists = this.roles.some(r => r.name === this.roleForm.name);
      if (exists) {
        alert('Role dengan nama ini sudah ada');
        return;
      }
      this.roles.push({
        id: this.roles.length + 1,
        name: this.roleForm.name,
        description: this.roleForm.description,
        userCount: 0,
        permissions: [...this.roleForm.permissions]
      });
      this.closeModal();
      alert('Role berhasil ditambahkan!');
    },
    editRole(role) {
      this.editMode = true;
      this.editingRoleId = role.id;
      this.roleForm = {
        name: role.name,
        description: role.description,
        permissions: [...role.permissions]
      };
      this.showAddRoleModal = true;
    },
    updateRole() {
      const idx = this.roles.findIndex(r => r.id === this.editingRoleId);
      if (idx !== -1) {
        this.roles[idx].name = this.roleForm.name;
        this.roles[idx].description = this.roleForm.description;
        this.roles[idx].permissions = [...this.roleForm.permissions];
        this.closeModal();
        alert('Role berhasil diperbarui!');
      }
    },
    deleteRole(role) {
      if (confirm(`Hapus role "${role.name}"?`)) {
        this.roles = this.roles.filter(r => r.id !== role.id);
        alert('Role berhasil dihapus!');
      }
    }
  }
}
</script>

<style scoped>
.admin-roles {
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
.action-bar-left,
.action-bar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .action-bar-left,
  .action-bar-right {
    width: 100%;
    justify-content: flex-start;
  }
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
  min-width: 250px;
}

.search-btn {
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
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

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
  border: 1px solid #e5e7eb;
  overflow-x: auto;
  margin-bottom: 2rem;
}

.main-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.main-table th {
  background: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.main-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.main-table tr:hover {
  background: #f9fafb;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
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

.permission-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.permission-badge {
  background: #f3f4f6;
  color: #374151;
  border-radius: 12px;
  padding: 0.2rem 0.7rem;
  font-size: 0.75rem;
  margin-bottom: 2px;
  display: inline-block;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.page-info {
  color: #6b7280;
  font-size: 0.95rem;
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

.permission-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
}

.checkbox-label {
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .admin-roles {
    padding: 1rem;
  }
  .main-table {
    min-width: 700px;
  }
}
@media (max-width: 768px) {
  .admin-roles {
    padding: 0.5rem;
  }
  .main-table {
    font-size: 0.875rem;
    min-width: 500px;
  }
  .main-table th,
  .main-table td {
    padding: 0.5rem;
  }
  .action-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }
  .permission-list {
    flex-direction: column;
    gap: 0.1rem;
  }
}
</style>
