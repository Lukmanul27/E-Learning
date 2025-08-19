<template>
  <aside class="sidebar sidebar-admin" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="brand">
        <span class="brand-icon">👨‍💼</span>
        <span class="brand-title" v-show="!isCollapsed">Admin</span>
      </div>
      <button 
        class="collapse-btn" 
        @click="toggleCollapse"
        :title="isCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'"
      >
        <span class="collapse-icon" :class="{ 'rotated': isCollapsed }">⮜</span>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li>
          <router-link 
            to="/admin/dashboard" 
            class="nav-link" 
            active-class="active"
            @click="handleNavClick"
          >
            <span class="nav-icon">🏠</span>
            <span class="nav-text" v-show="!isCollapsed">Dashboard</span>
            <span class="nav-tooltip" v-show="isCollapsed">Dashboard</span>
          </router-link>
        </li>
        <li>
          <div 
            class="nav-link dropdown-link" 
            @click="toggleDropdown('users')"
            :class="{ 'active': activeDropdown === 'users' }"
          >
            <span class="nav-icon">👥</span>
            <span class="nav-text" v-show="!isCollapsed">Manajemen User</span>
            <span class="dropdown-arrow" :class="{ 'rotated': dropdowns.users }" v-show="!isCollapsed">▼</span>
            <span class="nav-tooltip" v-show="isCollapsed">Users</span>
          </div>
          <transition name="submenu">
            <ul class="submenu" v-if="dropdowns.users && !isCollapsed">
              <li>
                <router-link to="/admin/users" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">👤</span>
                  <span>Lihat Semua User</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/tambah-user" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">➕</span>
                  <span>Tambah User</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/kelola-role" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">🔐</span>
                  <span>Kelola Role</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        
        <li>
          <div 
            class="nav-link dropdown-link" 
            @click="toggleDropdown('system')"
            :class="{ 'active': activeDropdown === 'system' }"
          >
            <span class="nav-icon">⚙️</span>
            <span class="nav-text" v-show="!isCollapsed">Sistem</span>
            <span class="dropdown-arrow" :class="{ 'rotated': dropdowns.system }" v-show="!isCollapsed">▼</span>
            <span class="nav-tooltip" v-show="isCollapsed">Sistem</span>
          </div>
          <transition name="submenu">
            <ul class="submenu" v-if="dropdowns.system && !isCollapsed">
              <li>
                <router-link to="/admin/system/backup" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">💾</span>
                  <span>Backup & Restore</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/system/logs" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📋</span>
                  <span>System Logs</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/system/monitoring" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📊</span>
                  <span>Monitoring</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        
        <li>
          <div 
            class="nav-link dropdown-link" 
            @click="toggleDropdown('reports')"
            :class="{ 'active': activeDropdown === 'reports' }"
          >
            <span class="nav-icon">📊</span>
            <span class="nav-text" v-show="!isCollapsed">Laporan</span>
            <span class="dropdown-arrow" :class="{ 'rotated': dropdowns.reports }" v-show="!isCollapsed">▼</span>
            <span class="nav-tooltip" v-show="isCollapsed">Laporan</span>
          </div>
          <transition name="submenu">
            <ul class="submenu" v-if="dropdowns.reports && !isCollapsed">
              <li>
                <router-link to="/admin/reports/users" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">👥</span>
                  <span>Laporan User</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/reports/activities" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📈</span>
                  <span>Laporan Aktivitas</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/reports/performance" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">🚀</span>
                  <span>Laporan Performa</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        
        <li>
          <router-link 
            to="/admin/settings" 
            class="nav-link" 
            active-class="active"
            @click="handleNavClick"
          >
            <span class="nav-icon">🔧</span>
            <span class="nav-text" v-show="!isCollapsed">Pengaturan</span>
            <span class="nav-tooltip" v-show="isCollapsed">Pengaturan</span>
          </router-link>
        </li>
        
        <li>
          <router-link 
            to="/admin/help" 
            class="nav-link" 
            active-class="active"
            @click="handleNavClick"
          >
            <span class="nav-icon">❓</span>
            <span class="nav-text" v-show="!isCollapsed">Bantuan</span>
            <span class="nav-tooltip" v-show="isCollapsed">Bantuan</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <div class="sidebar-footer">
      <div class="user-info" :class="{ 'collapsed': isCollapsed }">
        <div class="user-avatar">
          <span class="avatar-emoji">👨‍💼</span>
        </div>
        <div class="user-details" v-show="!isCollapsed">
          <span class="user-name">Admin</span>
          <span class="user-role">Super Admin</span>
        </div>
        <div class="user-tooltip" v-show="isCollapsed">
          <span>Admin - Super Admin</span>
        </div>
      </div>
      <div class="footer-actions" v-show="!isCollapsed">
        <button class="logout-btn" @click="handleLogout">
          <span class="logout-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
      <div class="footer-actions-collapsed" v-show="isCollapsed">
        <button class="logout-btn-collapsed" @click="handleLogout" title="Logout">
          <span class="logout-icon">🚪</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarAdmin',
  data() {
    return {
      isCollapsed: false,
      dropdowns: {
        users: false,
        system: false,
        reports: false
      },
      activeDropdown: null
    }
  },
  mounted() {
    this.loadUserPreferences();
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.saveUserPreferences();
      this.emitSidebarChange();
    },
    toggleDropdown(menu) {
      if (this.activeDropdown === menu) {
        this.dropdowns[menu] = !this.dropdowns[menu];
        this.activeDropdown = null;
      } else {
        Object.keys(this.dropdowns).forEach(key => {
          this.dropdowns[key] = false;
        });
        this.dropdowns[menu] = true;
        this.activeDropdown = menu;
      }
    },
    handleNavClick() {
      Object.keys(this.dropdowns).forEach(key => {
        this.dropdowns[key] = false;
      });
      this.activeDropdown = null;
    },

    handleLogout() {
      if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('userRole');
        this.$router.push('/login');
      }
    },
    checkScreenSize() {
      if (window.innerWidth <= 768) {
        this.isCollapsed = true;
      }
    },
    loadUserPreferences() {
      const savedCollapsed = localStorage.getItem('sidebarCollapsed');
      if (savedCollapsed !== null) {
        this.isCollapsed = JSON.parse(savedCollapsed);
      }
    },
    saveUserPreferences() {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
    },
    emitSidebarChange() {
      this.$emit('sidebar-change', { collapsed: this.isCollapsed });
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%);
  color: #fff;
  border-right: 1px solid #e0e7ef;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.08);
  z-index: 100;
  transition: width 0.2s;
}

.sidebar-collapsed {
  width: 72px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 20px 18px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #b91c1c;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-icon {
  font-size: 2rem;
  margin-right: 12px;
}

.brand-title {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.collapse-btn {
  background: #fff;
  color: #b91c1c;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
  font-size: 1.1rem;
}

.collapse-btn:hover {
  background: #e0e7ef;
  color: #991b1b;
}

.collapse-icon {
  transition: transform 0.2s;
}

.collapse-icon.rotated {
  transform: rotate(180deg);
}

.sidebar-nav {
  flex: 1;
  padding: 18px 0 0 0;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  margin: 0 12px 4px 12px;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateX(4px);
}

.nav-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.nav-text {
  flex: 1;
  font-weight: 500;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.nav-tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  margin-left: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 1000;
}

.nav-tooltip::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 50%;
  transform: translateY(-50%);
  border: 4px solid transparent;
  border-right-color: #1f2937;
}

.sidebar:hover .nav-tooltip {
  opacity: 1;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0 12px 8px 12px;
  overflow: hidden;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 56px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s;
  border-radius: 6px;
  margin: 2px 8px;
}

.submenu-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateX(4px);
}

.submenu-icon {
  font-size: 1rem;
  margin-right: 8px;
}

.sidebar-footer {
  padding: 18px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: #b91c1c;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-info.collapsed {
  justify-content: center;
}

.user-avatar {
  font-size: 2rem;
  margin-right: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #fff;
  font-size: 0.9rem;
}

.user-role {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

.user-tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  margin-left: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 1000;
}

.user-tooltip::before {
  content: '';
  position: absolute;
  left: -4px;
  top: 50%;
  transform: translateY(-50%);
  border: 4px solid transparent;
  border-right-color: #1f2937;
}

.sidebar:hover .user-tooltip {
  opacity: 1;
}

.footer-actions {
  display: flex;
  gap: 8px;
}



.logout-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.footer-actions-collapsed {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.logout-btn-collapsed {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 1rem;
}

.logout-btn-collapsed:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.logout-icon {
  font-size: 1rem;
}

/* Transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .sidebar-collapsed {
    width: 100%;
  }
  
  .main-content {
    margin-left: 0 !important;
  }
}
</style>
