
<template>
  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />

    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container admin-users">
        <!-- Header Section -->
        <div class="page-header">
          <h1>➕ Tambah User</h1>
          <p class="page-description">
            Tambahkan user baru ke sistem E-Learning. Anda dapat menambah satu per satu atau secara kolektif (massal) menggunakan file Excel.
          </p>
        </div>

        <!-- Tab Switcher -->
        <div class="action-bar" style="margin-bottom: 1.5rem;">
          <button
            class="btn-primary"
            :class="{ 'active-tab': activeTab === 'single' }"
            @click="activeTab = 'single'"
            style="margin-right: 0.5rem;"
          >
            Tambah Satu User
          </button>
          <button
            class="btn-primary"
            :class="{ 'active-tab': activeTab === 'bulk' }"
            @click="activeTab = 'bulk'"
          >
            Tambah Kolektif (Excel)
          </button>
        </div>

        <!-- Single User Form -->
        <div v-if="activeTab === 'single'" class="modal-body" style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;">
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
              <button type="reset" class="btn-outline" @click="resetSingleForm">
                Reset
              </button>
              <button type="submit" class="btn-primary">
                Tambah User
              </button>
            </div>
          </form>
        </div>

        <!-- Bulk User Upload -->
        <div v-if="activeTab === 'bulk'" class="modal-body" style="background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;">
          <form @submit.prevent="uploadBulkUsers">
            <div class="form-group">
              <label>Upload File Excel (.xlsx)</label>
              <input type="file" accept=".xlsx,.xls" @change="handleFileUpload" class="form-input" required />
              <small>
                <a href="#" @click.prevent="downloadTemplate">Download template Excel</a>
              </small>
            </div>
            <div v-if="bulkPreview.length" class="form-group" style="max-height: 200px; overflow-y: auto;">
              <label>Preview Data:</label>
              <table class="users-table" style="font-size: 0.9rem;">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, idx) in bulkPreview" :key="idx">
                    <td>{{ user.nama }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>••••••••</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="form-actions">
              <button type="reset" class="btn-outline" @click="resetBulkForm">
                Reset
              </button>
              <button type="submit" class="btn-primary" :disabled="!bulkPreview.length">
                Tambah User Kolektif
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarAdmin from '../../../components/NavbarAdmin.vue';
// NOTE: For Excel parsing, you need to install 'xlsx' and import it in the real project
// import * as XLSX from 'xlsx';

export default {
  name: 'TambahUser',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      activeTab: 'single',
      newUser: {
        nama: '',
        email: '',
        role: '',
        password: ''
      },
      bulkFile: null,
      bulkPreview: []
    };
  },
  methods: {
    handleSidebarChange(data) {
      this.sidebarCollapsed = data.collapsed;
    },
    resetSingleForm() {
      this.newUser = { nama: '', email: '', role: '', password: '' };
    },
    addUser() {
      if (!this.newUser.nama || !this.newUser.email || !this.newUser.role || !this.newUser.password) {
        alert('Semua field harus diisi');
        return;
      }
      // TODO: Replace with API call
      alert(`User ${this.newUser.nama} berhasil ditambahkan!`);
      this.resetSingleForm();
    },
    handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) {
        this.bulkPreview = [];
        return;
      }
      this.bulkFile = file;
      // Simulasi parsing Excel (real: pakai XLSX.read)
      // Di sini hanya contoh dummy, implementasi asli harus parsing file Excel
      // Contoh: XLSX.read(file, { type: 'binary' }) dst.
      // Simulasi: preview 2 user
      setTimeout(() => {
        this.bulkPreview = [
          { nama: 'Contoh User 1', email: 'user1@email.com', role: 'guru', password: 'password1' },
          { nama: 'Contoh User 2', email: 'user2@email.com', role: 'siswa', password: 'password2' }
        ];
      }, 500);
    },
    uploadBulkUsers() {
      if (!this.bulkPreview.length) {
        alert('Silakan upload file Excel yang valid.');
        return;
      }
      // TODO: Replace with API call
      alert(`${this.bulkPreview.length} user berhasil ditambahkan secara kolektif!`);
      this.resetBulkForm();
    },
    resetBulkForm() {
      this.bulkFile = null;
      this.bulkPreview = [];
      // Reset file input
      this.$el.querySelector('input[type="file"]').value = '';
    },
    downloadTemplate() {
      // Simulasi download template Excel
      const csvContent = "Nama,Email,Role,Password\n";
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'template_user.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
</script>

<style scoped>
@import './Users.vue';

.active-tab {
  background: #b91c1c !important;
  color: #fff !important;
}

.form-group label {
  font-weight: 500;
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #6b7280;
}

.users-table th, .users-table td {
  padding: 0.5rem;
}
</style>
