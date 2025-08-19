import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/LoginUser.vue'
import AdminDashboard from './views/admin/dashboard_admin.vue'
import OperatorDashboard from './views/operator/dashboard_operator.vue'
import GuruDashboard from './views/guru/dashboard_guru.vue'
import SiswaDashboard from './views/siswa/dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // Admin routes
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('./views/admin/manajement_user/Users.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users/tambah',
    name: 'AdminUsersTambah',
    component: () => import('./views/admin/manajement_user/Users.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users/:id',
    name: 'AdminUserDetail',
    component: () => import('./views/admin/manajement_user/Users.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/users/edit/:id',
    name: 'AdminUserEdit',
    component: () => import('./views/admin/manajement_user/Users.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/kelola-role',
    name: 'AdminUserEdit',
    component: () => import('./views/admin/manajement_user/Role.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/system/backup',
    name: 'AdminSystemBackup',
    component: () => import('./views/admin/system/System.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/system/logs',
    name: 'AdminSystemLogs',
    component: () => import('./views/admin/system/System-log.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/system/monitoring',
    name: 'AdminSystemMonitoring',
    component: () => import('./views/admin/system/System-perform.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/reports/users',
    name: 'AdminReportsUsers',
    component: () => import('./views/admin/laporan/Reports.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/reports/activities',
    name: 'AdminReportsActivities',
    component: () => import('./views/admin/laporan/Reports.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/reports/performance',
    name: 'AdminReportsPerformance',
    component: () => import('./views/admin/laporan/Reports.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/settings',
    name: 'AdminSettings',
    component: () => import('./views/admin/komponen_lainnya/setting-admin.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/help',
    name: 'AdminHelp',
    component: () => import('./views/admin/komponen_lainnya/help-admin.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/backup',
    name: 'AdminBackup',
    component: () => import('./views/admin/system/System.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  // {
  //   path: '/admin/activities',
  //   name: 'AdminActivities',
  //   component: () => import('./views/admin/Activities.vue'),
  //   meta: { requiresAuth: true, role: 'admin' }
  // },
  // Operator routes
  {
    path: '/operator',
    redirect: '/operator/dashboard'
  },
  {
    path: '/operator/dashboard',
    name: 'OperatorDashboard',
    component: OperatorDashboard,
    meta: { requiresAuth: true, role: 'operator' }
  },
  // {
  //   path: '/operator/kelas',
  //   name: 'OperatorKelas',
  //   component: () => import('./views/operator/Classes.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/kelas/tambah',
  //   name: 'OperatorKelasTambah',
  //   component: () => import('./views/operator/Classes.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/kelas/:id',
  //   name: 'OperatorKelasDetail',
  //   component: () => import('./views/operator/Classes.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/kelas/edit/:id',
  //   name: 'OperatorKelasEdit',
  //   component: () => import('./views/operator/Classes.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/mata-pelajaran',
  //   name: 'OperatorMataPelajaran',
  //   component: () => import('./views/operator/Subjects.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/mata-pelajaran/tambah',
  //   name: 'OperatorMataPelajaranTambah',
  //   component: () => import('./views/operator/Subjects.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/mata-pelajaran/:id',
  //   name: 'OperatorMataPelajaranDetail',
  //   component: () => import('./views/operator/Subjects.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/mata-pelajaran/edit/:id',
  //   name: 'OperatorMataPelajaranEdit',
  //   component: () => import('./views/operator/Subjects.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/jadwal',
  //   name: 'OperatorJadwal',
  //   component: () => import('./views/operator/Schedule.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/jadwal/buat',
  //   name: 'OperatorJadwalBuat',
  //   component: () => import('./views/operator/Schedule.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/jadwal/edit',
  //   name: 'OperatorJadwalEdit',
  //   component: () => import('./views/operator/Schedule.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/data',
  //   name: 'OperatorData',
  //   component: () => import('./views/operator/Data.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/settings',
  //   name: 'OperatorSettings',
  //   component: () => import('./views/operator/Settings.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // {
  //   path: '/operator/activities',
  //   name: 'OperatorActivities',
  //   component: () => import('./views/operator/Activities.vue'),
  //   meta: { requiresAuth: true, role: 'operator' }
  // },
  // Guru routes
  {
    path: '/guru',
    redirect: '/guru/dashboard'
  },
  {
    path: '/guru/dashboard',
    name: 'GuruDashboard',
    component: GuruDashboard,
    meta: { requiresAuth: true, role: 'guru' }
  },
  // {
  //   path: '/guru/materi',
  //   name: 'GuruMateri',
  //   component: () => import('./views/guru/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/materi/tambah',
  //   name: 'GuruMateriTambah',
  //   component: () => import('./views/guru/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/materi/:id',
  //   name: 'GuruMateriDetail',
  //   component: () => import('./views/guru/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/materi/edit/:id',
  //   name: 'GuruMateriEdit',
  //   component: () => import('./views/guru/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/tugas',
  //   name: 'GuruTugas',
  //   component: () => import('./views/guru/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/tugas/buat',
  //   name: 'GuruTugasBuat',
  //   component: () => import('./views/guru/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/tugas/:id',
  //   name: 'GuruTugasDetail',
  //   component: () => import('./views/guru/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/tugas/edit/:id',
  //   name: 'GuruTugasEdit',
  //   component: () => import('./views/guru/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/tugas/nilai/:id',
  //   name: 'GuruTugasNilai',
  //   component: () => import('./views/guru/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/quis',
  //   name: 'GuruQuis',
  //   component: () => import('./views/guru/Quis.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/quis/buat',
  //   name: 'GuruQuisBuat',
  //   component: () => import('./views/guru/Quis.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/quis/nilai',
  //   name: 'GuruQuisNilai',
  //   component: () => import('./views/guru/Quis.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/nilai',
  //   name: 'GuruNilai',
  //   component: () => import('./views/guru/Nilai.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/kelas',
  //   name: 'GuruKelas',
  //   component: () => import('./views/guru/Kelas.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // {
  //   path: '/guru/pengaturan',
  //   name: 'GuruPengaturan',
  //   component: () => import('./views/guru/Settings.vue'),
  //   meta: { requiresAuth: true, role: 'guru' }
  // },
  // Siswa routes
  {
    path: '/siswa',
    redirect: '/siswa/dashboard'
  },
  {
    path: '/siswa/dashboard',
    name: 'SiswaDashboard',
    component: SiswaDashboard,
    meta: { requiresAuth: true, role: 'siswa' }
  },
  // {
  //   path: '/siswa/materi',
  //   name: 'SiswaMateri',
  //   component: () => import('./views/siswa/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/materi/download',
  //   name: 'SiswaMateriDownload',
  //   component: () => import('./views/siswa/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/materi/history',
  //   name: 'SiswaMateriHistory',
  //   component: () => import('./views/siswa/Materi.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/tugas',
  //   name: 'SiswaTugas',
  //   component: () => import('./views/siswa/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/tugas/kerjakan',
  //   name: 'SiswaTugasKerjakan',
  //   component: () => import('./views/siswa/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/tugas/hasil',
  //   name: 'SiswaTugasHasil',
  //   component: () => import('./views/siswa/Tugas.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/nilai',
  //   name: 'SiswaNilai',
  //   component: () => import('./views/siswa/Nilai.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/jadwal',
  //   name: 'SiswaJadwal',
  //   component: () => import('./views/siswa/Jadwal.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // {
  //   path: '/siswa/profil',
  //   name: 'SiswaProfil',
  //   component: () => import('./views/siswa/Profil.vue'),
  //   meta: { requiresAuth: true, role: 'siswa' }
  // },
  // Fallback route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole')
  if(to.meta.requiresAuth) {
    if(!userRole) next('/login')
    else if(to.meta.role && to.meta.role !== userRole) next('/login')
    else next()
  } else {
    next()
  }
})

export default router
