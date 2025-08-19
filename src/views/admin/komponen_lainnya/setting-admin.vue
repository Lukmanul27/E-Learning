<template>
  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />
    
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="settings-container">
        <!-- Header Section -->
        <div class="settings-header">
          <h1>🔧 Pengaturan Sistem</h1>
          <p class="settings-subtitle">Konfigurasi sistem E-Learning sesuai kebutuhan institusi</p>
        </div>

        <!-- Settings Navigation -->
        <div class="settings-nav">
          <button 
            v-for="tab in settingsTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="nav-tab"
            :class="{ 'active': activeTab === tab.id }"
          >
            <span class="tab-icon">{{ tab.icon }}</span>
            <span class="tab-text">{{ tab.name }}</span>
          </button>
        </div>

        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="settings-section">
          <h2>⚙️ Pengaturan Umum</h2>
          <div class="settings-grid">
            <div class="setting-card">
              <h3>Informasi Institusi</h3>
              <div class="form-group">
                <label>Nama Institusi</label>
                <input 
                  type="text" 
                  v-model="generalSettings.institutionName" 
                  class="form-input"
                  placeholder="Nama Sekolah/Universitas"
                />
              </div>
              <div class="form-group">
                <label>Alamat</label>
                <textarea 
                  v-model="generalSettings.address" 
                  class="form-textarea"
                  placeholder="Alamat lengkap institusi"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group">
                <label>Email Kontak</label>
                <input 
                  type="email" 
                  v-model="generalSettings.contactEmail" 
                  class="form-input"
                  placeholder="email@institusi.edu"
                />
              </div>
              <div class="form-group">
                <label>Nomor Telepon</label>
                <input 
                  type="tel" 
                  v-model="generalSettings.phoneNumber" 
                  class="form-input"
                  placeholder="+62 21 1234 5678"
                />
              </div>
            </div>

            <div class="setting-card">
              <h3>Pengaturan Sistem</h3>
              <div class="form-group">
                <label>Zona Waktu</label>
                <select v-model="generalSettings.timezone" class="form-select">
                  <option value="Asia/Jakarta">WIB (UTC+7)</option>
                  <option value="Asia/Makassar">WITA (UTC+8)</option>
                  <option value="Asia/Jayapura">WIT (UTC+9)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Bahasa Default</label>
                <select v-model="generalSettings.language" class="form-select">
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div class="form-group">
                <label>Format Tanggal</label>
                <select v-model="generalSettings.dateFormat" class="form-select">
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div class="form-group">
                <label>Maksimal File Upload (MB)</label>
                <input 
                  type="number" 
                  v-model="generalSettings.maxFileSize" 
                  class="form-input"
                  min="1"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- User Management Settings -->
        <div v-if="activeTab === 'users'" class="settings-section">
          <h2>👥 Pengaturan Manajemen User</h2>
          <div class="settings-grid">
            <div class="setting-card">
              <h3>Kebijakan Password</h3>
              <div class="form-group">
                <label>Minimal Panjang Password</label>
                <input 
                  type="number" 
                  v-model="userSettings.minPasswordLength" 
                  class="form-input"
                  min="6"
                  max="20"
                />
              </div>
              <div class="form-group">
                <label>Password Harus Mengandung:</label>
                <div class="checkbox-group">
                  <label class="checkbox-item">
                    <input 
                      type="checkbox" 
                      v-model="userSettings.passwordRequirements.uppercase"
                    />
                    <span>Huruf Besar (A-Z)</span>
                  </label>
                  <label class="checkbox-item">
                    <input 
                      type="checkbox" 
                      v-model="userSettings.passwordRequirements.lowercase"
                    />
                    <span>Huruf Kecil (a-z)</span>
                  </label>
                  <label class="checkbox-item">
                    <input 
                      type="checkbox" 
                      v-model="userSettings.passwordRequirements.numbers"
                    />
                    <span>Angka (0-9)</span>
                  </label>
                  <label class="checkbox-item">
                    <input 
                      type="checkbox" 
                      v-model="userSettings.passwordRequirements.symbols"
                    />
                    <span>Simbol (!@#$%^&*)</span>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label>Password Expired (hari)</label>
                <input 
                  type="number" 
                  v-model="userSettings.passwordExpiryDays" 
                  class="form-input"
                  min="0"
                  max="365"
                />
                <small>0 = tidak ada expired</small>
              </div>
            </div>

            <div class="setting-card">
              <h3>Kebijakan Akun</h3>
              <div class="form-group">
                <label>Maksimal Login Gagal</label>
                <input 
                  type="number" 
                  v-model="userSettings.maxLoginAttempts" 
                  class="form-input"
                  min="3"
                  max="10"
                />
              </div>
              <div class="form-group">
                <label>Lockout Duration (menit)</label>
                <input 
                  type="number" 
                  v-model="userSettings.lockoutDuration" 
                  class="form-input"
                  min="5"
                  max="1440"
                />
              </div>
              <div class="form-group">
                <label>Auto Logout (menit)</label>
                <input 
                  type="number" 
                  v-model="userSettings.autoLogoutMinutes" 
                  class="form-input"
                  min="15"
                  max="480"
                />
                <small>0 = tidak ada auto logout</small>
              </div>
              <div class="form-group">
                <label>Verifikasi Email</label>
                <select v-model="userSettings.emailVerification" class="form-select">
                  <option value="required">Wajib</option>
                  <option value="optional">Opsional</option>
                  <option value="disabled">Tidak Aktif</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="settings-section">
          <h2>🔒 Pengaturan Keamanan</h2>
          <div class="settings-grid">
            <div class="setting-card">
              <h3>Keamanan Sistem</h3>
              <div class="form-group">
                <label>Two-Factor Authentication</label>
                <select v-model="securitySettings.twoFactorAuth" class="form-select">
                  <option value="disabled">Tidak Aktif</option>
                  <option value="optional">Opsional</option>
                  <option value="required">Wajib untuk Admin</option>
                  <option value="required_all">Wajib untuk Semua</option>
                </select>
              </div>
              <div class="form-group">
                <label>Session Timeout (menit)</label>
                <input 
                  type="number" 
                  v-model="securitySettings.sessionTimeout" 
                  class="form-input"
                  min="15"
                  max="1440"
                />
              </div>
              <div class="form-group">
                <label>IP Whitelist</label>
                <textarea 
                  v-model="securitySettings.ipWhitelist" 
                  class="form-textarea"
                  placeholder="Masukkan IP yang diizinkan (satu per baris)"
                  rows="4"
                ></textarea>
                <small>Kosongkan untuk mengizinkan semua IP</small>
              </div>
            </div>

            <div class="setting-card">
              <h3>Backup & Recovery</h3>
              <div class="form-group">
                <label>Auto Backup</label>
                <select v-model="securitySettings.autoBackup" class="form-select">
                  <option value="disabled">Tidak Aktif</option>
                  <option value="daily">Harian</option>
                  <option value="weekly">Mingguan</option>
                  <option value="monthly">Bulanan</option>
                </select>
              </div>
              <div class="form-group">
                <label>Backup Time</label>
                <input 
                  type="time" 
                  v-model="securitySettings.backupTime" 
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label>Retention Period (hari)</label>
                <input 
                  type="number" 
                  v-model="securitySettings.backupRetention" 
                  class="form-input"
                  min="7"
                  max="365"
                />
              </div>
              <div class="form-group">
                <label>Backup Location</label>
                <input 
                  type="text" 
                  v-model="securitySettings.backupLocation" 
                  class="form-input"
                  placeholder="/backup/elearning"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notifications'" class="settings-section">
          <h2>🔔 Pengaturan Notifikasi</h2>
          <div class="settings-grid">
            <div class="setting-card">
              <h3>Email Notifications</h3>
              <div class="form-group">
                <label>SMTP Server</label>
                <input 
                  type="text" 
                  v-model="notificationSettings.smtpServer" 
                  class="form-input"
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div class="form-group">
                <label>SMTP Port</label>
                <input 
                  type="number" 
                  v-model="notificationSettings.smtpPort" 
                  class="form-input"
                  placeholder="587"
                />
              </div>
              <div class="form-group">
                <label>Email Pengirim</label>
                <input 
                  type="email" 
                  v-model="notificationSettings.senderEmail" 
                  class="form-input"
                  placeholder="noreply@institusi.edu"
                />
              </div>
              <div class="form-group">
                <label>Password Email</label>
                <input 
                  type="password" 
                  v-model="notificationSettings.senderPassword" 
                  class="form-input"
                  placeholder="Password email pengirim"
                />
              </div>
            </div>

            <div class="setting-card">
              <h3>Jenis Notifikasi</h3>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="notificationSettings.notificationTypes.userRegistration"
                  />
                  <span>Registrasi User Baru</span>
                </label>
                <label class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="notificationSettings.notificationTypes.passwordReset"
                  />
                  <span>Reset Password</span>
                </label>
                <label class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="notificationSettings.notificationTypes.systemAlerts"
                  />
                  <span>Alert Sistem</span>
                </label>
                <label class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="notificationSettings.notificationTypes.backupStatus"
                  />
                  <span>Status Backup</span>
                </label>
                <label class="checkbox-item">
                  <input 
                    type="checkbox" 
                    v-model="notificationSettings.notificationTypes.securityAlerts"
                  />
                  <span>Alert Keamanan</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="settings-actions">
          <button @click="resetSettings" class="btn-secondary">Reset ke Default</button>
          <button @click="saveSettings" class="btn-primary">Simpan Pengaturan</button>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="message" class="message" :class="messageType">
          {{ message }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarAdmin from '../../../components/NavbarAdmin.vue';

export default {
  name: 'SettingsAdmin',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      activeTab: 'general',
      message: '',
      messageType: 'success',
      settingsTabs: [
        { id: 'general', name: 'Umum', icon: '⚙️' },
        { id: 'users', name: 'User', icon: '👥' },
        { id: 'security', name: 'Keamanan', icon: '🔒' },
        { id: 'notifications', name: 'Notifikasi', icon: '🔔' }
      ],
      generalSettings: {
        institutionName: 'SMA Negeri 1 Jakarta',
        address: 'Jl. Budi Utomo No. 7, Jakarta Pusat',
        contactEmail: 'info@sman1jakarta.sch.id',
        phoneNumber: '+62 21 384 1234',
        timezone: 'Asia/Jakarta',
        language: 'id',
        dateFormat: 'DD/MM/YYYY',
        maxFileSize: 10
      },
      userSettings: {
        minPasswordLength: 8,
        passwordRequirements: {
          uppercase: true,
          lowercase: true,
          numbers: true,
          symbols: false
        },
        passwordExpiryDays: 90,
        maxLoginAttempts: 5,
        lockoutDuration: 30,
        autoLogoutMinutes: 60,
        emailVerification: 'required'
      },
      securitySettings: {
        twoFactorAuth: 'required',
        sessionTimeout: 120,
        ipWhitelist: '',
        autoBackup: 'daily',
        backupTime: '02:00',
        backupRetention: 30,
        backupLocation: '/backup/elearning'
      },
      notificationSettings: {
        smtpServer: 'smtp.gmail.com',
        smtpPort: 587,
        senderEmail: 'noreply@sman1jakarta.sch.id',
        senderPassword: '',
        notificationTypes: {
          userRegistration: true,
          passwordReset: true,
          systemAlerts: true,
          backupStatus: true,
          securityAlerts: true
        }
      }
    };
  },
  methods: {
    handleSidebarChange(collapsed) {
      this.sidebarCollapsed = collapsed;
    },
    async saveSettings() {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.message = 'Pengaturan berhasil disimpan!';
        this.messageType = 'success';
        
        // Clear message after 3 seconds
        setTimeout(() => {
          this.message = '';
        }, 3000);
        
        console.log('Settings saved:', {
          general: this.generalSettings,
          user: this.userSettings,
          security: this.securitySettings,
          notification: this.notificationSettings
        });
      } catch (error) {
        this.message = 'Gagal menyimpan pengaturan. Silakan coba lagi.';
        this.messageType = 'error';
        
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    },
    resetSettings() {
      if (confirm('Apakah Anda yakin ingin mereset semua pengaturan ke default?')) {
        // Reset to default values
        this.generalSettings = {
          institutionName: 'SMA Negeri 1 Jakarta',
          address: 'Jl. Budi Utomo No. 7, Jakarta Pusat',
          contactEmail: 'info@sman1jakarta.sch.id',
          phoneNumber: '+62 21 384 1234',
          timezone: 'Asia/Jakarta',
          language: 'id',
          dateFormat: 'DD/MM/YYYY',
          maxFileSize: 10
        };
        
        this.userSettings = {
          minPasswordLength: 8,
          passwordRequirements: {
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: false
          },
          passwordExpiryDays: 90,
          maxLoginAttempts: 5,
          lockoutDuration: 30,
          autoLogoutMinutes: 60,
          emailVerification: 'required'
        };
        
        this.securitySettings = {
          twoFactorAuth: 'required',
          sessionTimeout: 120,
          ipWhitelist: '',
          autoBackup: 'daily',
          backupTime: '02:00',
          backupRetention: 30,
          backupLocation: '/backup/elearning'
        };
        
        this.notificationSettings = {
          smtpServer: 'smtp.gmail.com',
          smtpPort: 587,
          senderEmail: 'noreply@sman1jakarta.sch.id',
          senderPassword: '',
          notificationTypes: {
            userRegistration: true,
            passwordReset: true,
            systemAlerts: true,
            backupStatus: true,
            securityAlerts: true
          }
        };
        
        this.message = 'Pengaturan telah direset ke default!';
        this.messageType = 'success';
        
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
.settings-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.settings-header {
  text-align: center;
  margin-bottom: 40px;
}

.settings-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.settings-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.settings-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.nav-tab:hover {
  border-color: #3498db;
  transform: translateY(-2px);
}

.nav-tab.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.tab-icon {
  font-size: 1.2rem;
}

.settings-section {
  margin-bottom: 40px;
}

.settings-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid #3498db;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.setting-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.setting-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3498db;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group small {
  display: block;
  margin-top: 5px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #3498db;
}

.checkbox-item span {
  color: #2c3e50;
  font-size: 1rem;
}

.settings-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.btn-primary,
.btn-secondary {
  padding: 15px 30px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

.message {
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .settings-container {
    padding: 15px;
  }
  
  .settings-header h1 {
    font-size: 2rem;
  }
  
  .settings-nav {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-tab {
    width: 100%;
    justify-content: center;
  }
  
  .settings-grid {
    grid-template-columns: 1fr;
  }
  
  .settings-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}
</style>
