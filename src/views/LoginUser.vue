<script>
export default {
  name: 'LoginUser',
  data() {
    return {
      // Data form login, akan dikirim ke backend
      form: {
        username: '',
        password: ''
      },
      // Status loading untuk tombol login
      isLoading: false
    }
  },
  methods: {
    // Fungsi utama untuk proses login
    async handleLogin() {
      this.isLoading = true;
      try {
        // Simulasi delay, nanti ganti dengan request ke backend
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Validasi form, pastikan username dan password diisi
        if (!this.form.username || !this.form.password) {
          alert('Mohon lengkapi username dan password');
          return;
        }

        // Deteksi role user berdasarkan username (sementara, nanti backend yang handle)
        const userRole = this.detectUserRole(this.form.username);
        if (!userRole) {
          alert('Username tidak dikenali!');
          return;
        }

        // Validasi kredensial (sementara, nanti backend yang handle autentikasi)
        const validCredentials = this.validateCredentials(userRole);
        if (validCredentials) {
          // Simpan role user ke localStorage (bisa diganti dengan token dari backend)
          localStorage.setItem('userRole', userRole);
          // Redirect ke dashboard sesuai role
          this.redirectToDashboard(userRole);
        } else {
          alert('Password salah!');
        }
      } catch (error) {
        // Error handling jika terjadi masalah saat login
        console.error('Login error:', error);
        alert('Terjadi kesalahan saat login');
      } finally {
        this.isLoading = false;
      }
    },

    // Fungsi mapping username ke role (sementara, nanti backend yang tentukan role)
    detectUserRole(username) {
      const roleMapping = {
        'admin': 'admin',
        'operator': 'operator', 
        'guru': 'guru',
        'siswa': 'siswa'
      };
      return roleMapping[username.toLowerCase()] || null;
    },

    // Validasi username & password demo (sementara, nanti backend yang validasi)
    validateCredentials(role) {
      const demoAccounts = {
        admin: { username: 'admin', password: 'admin123' },
        operator: { username: 'operator', password: 'op123' },
        guru: { username: 'guru', password: 'guru123' },
        siswa: { username: 'siswa', password: 'siswa123' }
      };
      const expected = demoAccounts[role];
      return expected && 
             this.form.username.toLowerCase() === expected.username && 
             this.form.password === expected.password;
    },

    // Redirect ke dashboard sesuai role user
    redirectToDashboard(role) {
      const routes = {
        admin: '/admin/dashboard',
        operator: '/operator/dashboard',
        guru: '/guru/dashboard',
        siswa: '/siswa/dashboard'
      };
      const route = routes[role];
      if (route) {
        this.$router.push(route);
      }
    },

    // Isi otomatis form login dengan akun demo (untuk testing)
    fillDemoAccount(role) {
      const demoData = {
        admin: { username: 'admin', password: 'admin123' },
        operator: { username: 'operator', password: 'op123' },
        guru: { username: 'guru', password: 'guru123' },
        siswa: { username: 'siswa', password: 'siswa123' }
      };
      const data = demoData[role];
      if (data) {
        this.form.username = data.username;
        this.form.password = data.password;
      }
    }
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <div class="login-logo">
          <span class="logo-icon">🎓</span>
        </div>
        <h2>E-Learning System</h2>
        <p>Silakan login dengan akun Anda</p>
      </div>

      <!-- Form login, data akan dikirim ke backend pada tahap produksi -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <div class="input-icon-group">
            <span class="input-icon"><i class="fas fa-user"></i></span>
            <input 
              type="text" 
              id="username" 
              v-model="form.username" 
              placeholder="Masukkan username"
              required
              autocomplete="username"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-icon-group">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              placeholder="Masukkan password"
              required
              autocomplete="current-password"
            />
          </div>
        </div>

        <!-- Tombol login, disabled saat loading -->
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading" class="loader"></span>
          <span v-else>Login</span>
        </button>
      </form>

      <!-- Akun demo untuk testing, klik untuk autofill -->
      <div class="demo-accounts">
        <h4>💡 Demo Akun</h4>
        <div class="demo-grid">
          <div class="demo-account" @click="fillDemoAccount('admin')">
            <span class="demo-role admin"><i class="fas fa-crown"></i> Admin</span>
            <span class="demo-cred">admin / admin123</span>
          </div>
          <div class="demo-account" @click="fillDemoAccount('operator')">
            <span class="demo-role operator"><i class="fas fa-user-tie"></i> Operator</span>
            <span class="demo-cred">operator / op123</span>
          </div>
          <div class="demo-account" @click="fillDemoAccount('guru')">
            <span class="demo-role guru"><i class="fas fa-chalkboard-teacher"></i> Guru</span>
            <span class="demo-cred">guru / guru123</span>
          </div>
          <div class="demo-account" @click="fillDemoAccount('siswa')">
            <span class="demo-role siswa"><i class="fas fa-user-graduate"></i> Siswa</span>
            <span class="demo-cred">siswa / siswa123</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --login-bg1: #e0e7ff;
  --login-bg2: #f0fdfa;
  --login-surface: #f3f6fd;
  --login-shadow: 0 6px 32px 0 rgba(37, 99, 235, 0.10);
  --login-radius: 18px;
  --login-primary: #2563eb;
  --login-secondary: #06b6d4;
  --login-text: #f3f6fd;
  --login-text-light: #64748b;
  --login-border: #c7d2fe;
  --login-accent: #e0e7ff;
  --login-admin: #f59e42;
  --login-operator: #06b6d4;
  --login-guru: #22c55e;
  --login-siswa: #6366f1;
}

/* 
  Semua style di bawah ini hanya untuk tampilan halaman login.
  Tidak berpengaruh ke proses backend.
*/

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('../assets/bg.png') no-repeat center center fixed;
  background-size: cover;
  padding: 1.5rem;
}

.login-container {
  background: #006A4E;
  padding: 2.5rem 2.25rem 2.25rem 2.25rem;
  border-radius: var(--login-radius);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 410px;
  text-align: center;
  position: relative;
  animation: fadeIn 0.7s;
  color: #fff;
  border: none;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: none;}
}

.login-header {
  margin-bottom: 2.2rem;
}

.login-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
}

.logo-icon {
  font-size: 2.8rem;
  background: linear-gradient(90deg, var(--login-primary), var(--login-secondary));
  display: inline-block;
  filter: drop-shadow(0 2px 8px #a5b4fc88);
}

.login-header h2 {
  margin-bottom: 0.3rem;
  color: var(--login-primary);
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px #a5b4fc22;
}

.login-header p {
  color: var(--login-text-light);
  font-size: 1.08rem;
  font-weight: 500;
}

.login-form {
  margin-bottom: 2rem;
  text-align: left;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--login-text);
  font-weight: 600;
  font-size: 0.97rem;
  letter-spacing: 0.1px;
}

.input-icon-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 13px;
  color: var(--login-primary);
  font-size: 1.1rem;
  z-index: 2;
  opacity: 0.8;
}

.input-icon i {
  font-size: 1.1rem;
}

.input-icon-group input {
  width: 100%;
  padding: 13px 15px 13px 38px;
  border: 1.5px solid var(--login-border);
  border-radius: 8px;
  font-size: 15.5px;
  outline: none;
  background: #005A3F;
  color: var(--login-text);
  transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
  box-shadow: 0 1px 4px 0 rgba(37, 99, 235, 0.04);
}

.input-icon-group input:focus {
  border-color: var(--login-primary);
  box-shadow: 0 0 0 2.5px rgba(37, 99, 235, 0.13);
  background: #009664;
}

.login-btn {
  width: 100%;
  padding: 13px 0;
  font-size: 16.5px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--login-primary), var(--login-secondary));
  color: #fff !important;
  border: 1px groove #004C35;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.18s, transform 0.13s, box-shadow 0.18s;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  letter-spacing: 0.2px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
}

.login-btn:disabled {
  background: linear-gradient(90deg, #a5b4fc, #67e8f9);
  color: #e5e7eb !important;
  cursor: not-allowed;
  opacity: 0.85;
  transform: none;
  box-shadow: none;
}

.login-btn:not(:disabled):hover {
  background: linear-gradient(90deg, #1d4ed8, #0891b2);
  color: #fff !important;
  transform: translateY(-1.5px) scale(1.01);
  box-shadow: 0 4px 16px 0 rgba(37, 99, 235, 0.13);
}

.loader {
  border: 2.5px solid #e0e7ff;
  border-top: 2.5px solid var(--login-primary);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.7s linear infinite;
  display: inline-block;
  vertical-align: middle;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}

.demo-accounts {
  border-top: 1.5px solid #e5e7eb;
  padding-top: 1.3rem;
  margin-top: 1.2rem;
}

.demo-accounts h4 {
  color: var(--login-text);
  font-size: 1.01rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.1px;
  text-align: left;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
}

.demo-account {
  background: #004C35;
  border: 1.5px solid #006A4E;
  border-radius: 8px;
  padding: 0.7rem 0.6rem;
  cursor: pointer;
  transition: all 0.16s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  min-height: 60px;
  box-shadow: 0 1px 4px 0 rgba(37, 99, 235, 0.04);
  position: relative;
  overflow: hidden;
}

.demo-account:hover {
  background: #005A3F;
  border-color: var(--login-primary);
  transform: translateY(-1.5px) scale(1.01);
  box-shadow: 0 4px 16px 0 rgba(37, 99, 235, 0.10);
}

.demo-role {
  font-weight: 700;
  font-size: 0.93rem;
  margin-bottom: 0.18rem;
  display: flex;
  align-items: center;
  gap: 0.3em;
  letter-spacing: 0.1px;
}
.demo-role.admin { color: var(--login-admin);}
.demo-role.operator { color: var(--login-operator);}
.demo-role.guru { color: var(--login-guru);}
.demo-role.siswa { color: var(--login-siswa);}

.demo-role i {
  font-size: 1.1em;
  margin-right: 0.2em;
}

.demo-cred {
  color: var(--login-text-light);
  font-size: 0.81rem;
  font-family: 'JetBrains Mono', 'Fira Mono', 'Menlo', monospace;
  background: #1e293b;
  border-radius: 4px;
  padding: 1.5px 6px;
  margin-top: 1px;
  display: inline-block;
  word-break: break-all;
}

@media (max-width: 600px) {
  .login-container {
    padding: 1.5rem 0.7rem 1.2rem 0.7rem;
    max-width: 98vw;
  }
  .login-header h2 {
    font-size: 1.25rem;
  }
  .demo-grid {
    grid-template-columns: 1fr;
  }
  .demo-account {
    min-height: 54px;
  }
  .logo-icon {
    font-size: 2rem;
  }
}
</style>
