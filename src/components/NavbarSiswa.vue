<template>
  <aside class="sidebar sidebar-siswa" :class="{ 'sidebar-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="brand">
        <span class="brand-icon">👨‍🎓</span>
        <span class="brand-title" v-show="!isCollapsed">E-Learning Siswa</span>
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
            to="/siswa/dashboard" 
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
            @click="toggleDropdown('materi')"
            :class="{ 'active': activeDropdown === 'materi' }"
          >
            <span class="nav-icon">📚</span>
            <span class="nav-text" v-show="!isCollapsed">Materi</span>
            <span class="dropdown-arrow" :class="{ 'rotated': dropdowns.materi }" v-show="!isCollapsed">▼</span>
            <span class="nav-tooltip" v-show="isCollapsed">Materi</span>
          </div>
          <transition name="submenu">
            <ul class="submenu" v-if="dropdowns.materi && !isCollapsed">
              <li>
                <router-link to="/siswa/materi" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📖</span>
                  <span>Lihat Materi</span>
                </router-link>
              </li>
              <li>
                <router-link to="/siswa/materi/download" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">⬇️</span>
                  <span>Download Materi</span>
                </router-link>
              </li>
              <li>
                <router-link to="/siswa/materi/history" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📋</span>
                  <span>Riwayat Belajar</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <div 
            class="nav-link dropdown-link" 
            @click="toggleDropdown('tugas')"
            :class="{ 'active': activeDropdown === 'tugas' }"
          >
            <span class="nav-icon">📝</span>
            <span class="nav-text" v-show="!isCollapsed">Tugas</span>
            <span class="dropdown-arrow" :class="{ 'rotated': dropdowns.tugas }" v-show="!isCollapsed">▼</span>
            <span class="nav-tooltip" v-show="isCollapsed">Tugas</span>
          </div>
          <transition name="submenu">
            <ul class="submenu" v-if="dropdowns.tugas && !isCollapsed">
              <li>
                <router-link to="/siswa/tugas" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📄</span>
                  <span>Lihat Tugas</span>
                </router-link>
              </li>
              <li>
                <router-link to="/siswa/tugas/kerjakan" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">✏️</span>
                  <span>Kerjakan Tugas</span>
                </router-link>
              </li>
              <li>
                <router-link to="/siswa/tugas/hasil" class="submenu-link" @click="handleNavClick">
                  <span class="submenu-icon">📊</span>
                  <span>Hasil Tugas</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <router-link 
            to="/siswa/nilai" 
            class="nav-link" 
            active-class="active"
            @click="handleNavClick"
          >
            <span class="nav-icon">🎯</span>
            <span class="nav-text" v-show="!isCollapsed">Nilai</span>
            <span class="nav-tooltip" v-show="isCollapsed">Nilai</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/siswa/jadwal" 
            class="nav-link" 
            active-class="active"
            @click="handleNavClick"
          >
            <span class="nav-icon">📅</span>
            <span class="nav-text" v-show="!isCollapsed">Jadwal</span>
            <span class="nav-tooltip" v-show="isCollapsed">Jadwal</span>
          </router-link>
        </li>
        <li>
          <router-link 
            to="/siswa/profil" 
            class="nav-link" 
            active-class="active"
            @click="handleNavClick"
          >
            <span class="nav-icon">👤</span>
            <span class="nav-text" v-show="!isCollapsed">Profil</span>
            <span class="nav-tooltip" v-show="isCollapsed">Profil</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <div class="user-info" :class="{ 'collapsed': isCollapsed }">
        <div class="user-avatar">
          <span class="avatar-emoji">👨‍🎓</span>
        </div>
        <div class="user-details" v-show="!isCollapsed">
          <span class="user-name">Ani</span>
          <span class="user-role">Siswa</span>
        </div>
        <div class="user-tooltip" v-show="isCollapsed">
          <span>Ani - Siswa</span>
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
  name: 'SidebarSiswa',
  data() {
    return {
      isCollapsed: false,
      dropdowns: {
        materi: false,
        tugas: false
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
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
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
  border-bottom: 1px solid #e0e7ef;
  background: #2563eb;
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
  color: #2563eb;
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
  color: #1d4ed8;
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
  color: #e0e7ef;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  margin: 0 8px 4px 8px;
  position: relative;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  cursor: pointer;
}

.nav-link.active,
.nav-link.router-link-exact-active {
  background: #fff;
  color: #2563eb;
  font-weight: 700;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.08);
}

.nav-link:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
  transform: translateX(4px);
}

.nav-icon {
  font-size: 1.3rem;
  margin-right: 16px;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
  transition: transform 0.18s;
}

.nav-link:hover .nav-icon {
  transform: scale(1.15) rotate(5deg);
}

.nav-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #2563eb;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s;
  z-index: 10;
  margin-left: 10px;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.12);
}

.nav-link:hover .nav-tooltip {
  opacity: 1;
}

.dropdown-link {
  justify-content: space-between;
}

.dropdown-arrow {
  font-size: 0.9rem;
  margin-left: 8px;
  color: #e0e7ef;
  transition: transform 0.18s;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0 0 0 0;
  background: #1e40af;
  border-radius: 8px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 4px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.25s;
}

.submenu.show {
  max-height: 300px;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 44px;
  color: #e0e7ef;
  text-decoration: none;
  font-size: 0.98rem;
  border-radius: 8px;
  margin: 2px 0;
  position: relative;
  transition: background 0.18s, color 0.18s, padding 0.18s;
}

.submenu-link:hover {
  background: #2563eb;
  color: #fff;
  padding-left: 52px;
}

.submenu-icon {
  margin-right: 12px;
  font-size: 1.1rem;
}

.sidebar-footer {
  padding: 18px 20px;
  border-top: 1px solid #e0e7ef;
  background: #2563eb;
  position: sticky;
  bottom: 0;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 10px 0;
  background: transparent;
  border-radius: 8px;
  transition: background 0.18s;
  position: relative;
}

.user-info.collapsed {
  justify-content: center;
  padding: 10px 0;
}

.user-avatar {
  font-size: 2rem;
  margin-right: 14px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #2563eb;
  border-radius: 50%;
  border: 2px solid #2563eb;
  flex-shrink: 0;
}

.avatar-emoji {
  font-size: 1.6rem;
}

.user-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.user-name {
  font-weight: 700;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 2px;
}

.user-role {
  color: #e0e7ef;
  font-size: 0.85rem;
  background: #1e40af;
  padding: 2px 10px;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
}

.user-tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #2563eb;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s;
  z-index: 10;
  margin-left: 10px;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.12);
}

.user-info:hover .user-tooltip {
  opacity: 1;
}

.footer-actions {
  display: flex;
  gap: 10px;
}

.footer-actions-collapsed {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}



.logout-btn {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.18s;
}

.logout-btn:hover {
  background: #dc2626;
}

.logout-btn-collapsed {
  background: #ef4444;
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s;
}

.logout-btn-collapsed:hover {
  background: #dc2626;
}

.logout-icon {
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 900px) {
  .sidebar {
    width: 100vw;
    height: auto;
    position: relative;
    box-shadow: none;
    border-right: none;
    border-bottom: 1px solid #e0e7ef;
  }
  .sidebar-collapsed {
    width: 100vw;
  }
  .sidebar-header {
    padding: 16px 14px;
  }
  .nav-link {
    margin: 0;
    border-radius: 0;
  }
  .collapse-btn {
    display: none;
  }
  .sidebar-footer {
    padding: 14px 14px;
  }
}

@media (max-width: 640px) {
  .sidebar-header {
    padding: 12px 10px;
  }
  .sidebar-nav {
    padding: 10px 0 0 0;
  }
  .nav-link {
    padding: 10px 10px;
  }
  .user-info {
    padding: 8px 0;
  }
  .user-avatar {
    width: 36px;
    height: 36px;
    margin-right: 8px;
    font-size: 1.2rem;
  }
}
</style>
