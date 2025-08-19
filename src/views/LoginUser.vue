<script>
export default {
  name: 'LoginUser',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      
      try {
        // Simulasi login delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validasi sederhana
        if (!this.form.username || !this.form.password) {
          alert('Mohon lengkapi username dan password');
          return;
        }

        // Deteksi role berdasarkan username
        const userRole = this.detectUserRole(this.form.username);
        
        if (!userRole) {
          alert('Username tidak dikenali!');
          return;
        }

        // Validasi credentials
        const validCredentials = this.validateCredentials(userRole);
        
        if (validCredentials) {
          // Simpan role ke localStorage
          localStorage.setItem('userRole', userRole);
          
          // Redirect berdasarkan role
          this.redirectToDashboard(userRole);
        } else {
          alert('Password salah!');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Terjadi kesalahan saat login');
      } finally {
        this.isLoading = false;
      }
    },

    detectUserRole(username) {
      // Mapping username ke role
      const roleMapping = {
        'admin': 'admin',
        'operator': 'operator', 
        'guru': 'guru',
        'siswa': 'siswa'
      };

      return roleMapping[username.toLowerCase()] || null;
    },

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
    },

    forgotPassword() {
      alert('Fitur lupa password akan segera tersedia');
    },

    contactSupport() {
      alert('Hubungi support@elearning.com untuk bantuan');
    }
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h2>🎓 E-Learning System</h2>
        <p>Silakan login dengan akun Anda</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="form.username" 
            placeholder="Masukkan username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="form.password" 
            placeholder="Masukkan password"
            required
          />
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="extra-links">
        <a href="#" @click="forgotPassword">Lupa password?</a>
        <span class="separator">|</span>
        <a href="#" @click="contactSupport">Butuh bantuan?</a>
      </div>

      <!-- Demo Accounts -->
      <div class="demo-accounts">
        <h4>💡 Demo Accounts</h4>
        <div class="demo-grid">
          <div class="demo-account" @click="fillDemoAccount('admin')">
            <span class="demo-role">👑 Admin</span>
            <span class="demo-cred">admin / admin123</span>
          </div>
          <div class="demo-account" @click="fillDemoAccount('operator')">
            <span class="demo-role">👨‍💼 Operator</span>
            <span class="demo-cred">operator / op123</span>
          </div>
          <div class="demo-account" @click="fillDemoAccount('guru')">
            <span class="demo-role">👨‍🏫 Guru</span>
            <span class="demo-cred">guru / guru123</span>
          </div>
          <div class="demo-account" @click="fillDemoAccount('siswa')">
            <span class="demo-role">👨‍🎓 Siswa</span>
            <span class="demo-cred">siswa / siswa123</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  padding: 1rem;
}

.login-container {
  background: var(--surface);
  padding: 2.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.login-header {
  margin-bottom: 2rem;
}

.login-header h2 {
  margin-bottom: 0.5rem;
  color: var(--text);
  font-size: 2rem;
  font-weight: 700;
}

.login-header p {
  color: var(--text-light);
  font-size: 1rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: var(--radius);
  font-size: 15px;
  outline: none;
  transition: all var(--transition);
  background: white;
}

.form-group input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.login-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: all var(--transition);
}

.login-btn:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.login-btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
  transform: none;
}

.extra-links {
  margin-bottom: 2rem;
  font-size: 14px;
}

.extra-links a {
  color: var(--primary);
  text-decoration: none;
  transition: color var(--transition);
}

.extra-links a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.separator {
  margin: 0 0.5rem;
  color: var(--text-light);
}

.demo-accounts {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.demo-accounts h4 {
  color: var(--text);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.demo-account {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius);
  padding: 0.75rem;
  cursor: pointer;
  transition: all var(--transition);
}

.demo-account:hover {
  background: #f1f5f9;
  border-color: var(--primary);
  transform: translateY(-1px);
}

.demo-role {
  display: block;
  font-weight: 600;
  color: var(--text);
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.demo-cred {
  display: block;
  color: var(--text-light);
  font-size: 0.75rem;
  font-family: monospace;
}

@media (max-width: 480px) {
  .login-container {
    padding: 2rem 1.5rem;
  }
  
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .login-header h2 {
    font-size: 1.75rem;
  }
}
</style>
