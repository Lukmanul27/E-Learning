<template>
  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />
    
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="help-container">
        <!-- Header Section -->
        <div class="help-header">
          <h1>❓ Pusat Bantuan Admin</h1>
          <p class="help-subtitle">Temukan solusi untuk semua pertanyaan seputar sistem E-Learning</p>
        </div>

        <!-- Search Section -->
        <div class="search-section">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Cari bantuan..." 
              class="search-input"
            />
            <button class="search-btn">🔍</button>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <div class="action-card" @click="scrollToSection('faq')">
            <div class="action-icon">❓</div>
            <h3>FAQ</h3>
            <p>Pertanyaan yang sering diajukan</p>
          </div>
          <div class="action-card" @click="scrollToSection('user-management')">
            <div class="action-icon">👥</div>
            <h3>Manajemen User</h3>
            <p>Panduan mengelola pengguna</p>
          </div>
          <div class="action-card" @click="scrollToSection('system')">
            <div class="action-icon">⚙️</div>
            <h3>Sistem</h3>
            <p>Pengaturan dan monitoring</p>
          </div>
          <div class="action-card" @click="scrollToSection('reports')">
            <div class="action-icon">📊</div>
            <h3>Laporan</h3>
            <p>Membuat dan mengelola laporan</p>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="help-section" id="faq">
          <h2>❓ Pertanyaan yang Sering Diajukan</h2>
          <div class="faq-list">
            <div 
              v-for="(faq, index) in filteredFaqs" 
              :key="index" 
              class="faq-item"
              :class="{ 'expanded': expandedFaq === index }"
            >
              <div class="faq-question" @click="toggleFaq(index)">
                <span class="faq-text">{{ faq.question }}</span>
                <span class="faq-arrow">{{ expandedFaq === index ? '▲' : '▼' }}</span>
              </div>
              <div class="faq-answer" v-show="expandedFaq === index">
                <p>{{ faq.answer }}</p>
                <div v-if="faq.steps" class="faq-steps">
                  <h4>Langkah-langkah:</h4>
                  <ol>
                    <li v-for="step in faq.steps" :key="step">{{ step }}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Management Guide -->
        <div class="help-section" id="user-management">
          <h2>👥 Panduan Manajemen User</h2>
          <div class="guide-content">
            <div class="guide-card">
              <h3>Menambah User Baru</h3>
              <div class="step-list">
                <div class="step-item">
                  <span class="step-number">1</span>
                  <div class="step-content">
                    <h4>Buka Menu Manajemen User</h4>
                    <p>Klik menu "Manajemen User" di sidebar, kemudian pilih "Lihat Semua User"</p>
                  </div>
                </div>
                <div class="step-item">
                  <span class="step-number">2</span>
                  <div class="step-content">
                    <h4>Klik Tombol "Tambah User"</h4>
                    <p>Klik tombol "+ Tambah User" yang berada di bagian atas halaman</p>
                  </div>
                </div>
                <div class="step-item">
                  <span class="step-number">3</span>
                  <div class="step-content">
                    <h4>Isi Form User</h4>
                    <p>Lengkapi semua field yang diperlukan: nama, email, role, dan password</p>
                  </div>
                </div>
                <div class="step-item">
                  <span class="step-number">4</span>
                  <div class="step-content">
                    <h4>Simpan User</h4>
                    <p>Klik tombol "Simpan" untuk membuat user baru</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="guide-card">
              <h3>Mengelola Role User</h3>
              <div class="role-info">
                <div class="role-item">
                  <span class="role-icon">👨‍💼</span>
                  <div class="role-details">
                    <h4>Admin</h4>
                    <p>Akses penuh ke semua fitur sistem</p>
                  </div>
                </div>
                <div class="role-item">
                  <span class="role-icon">👨‍🏫</span>
                  <div class="role-details">
                    <h4>Guru</h4>
                    <p>Mengelola materi, tugas, dan nilai siswa</p>
                  </div>
                </div>
                <div class="role-item">
                  <span class="role-icon">👨‍🎓</span>
                  <div class="role-details">
                    <h4>Siswa</h4>
                    <p>Mengakses materi dan mengumpulkan tugas</p>
                  </div>
                </div>
                <div class="role-item">
                  <span class="role-icon">👩‍💼</span>
                  <div class="role-details">
                    <h4>Operator</h4>
                    <p>Mengelola data akademik dan laporan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Guide -->
        <div class="help-section" id="system">
          <h2>⚙️ Panduan Sistem</h2>
          <div class="guide-content">
            <div class="guide-card">
              <h3>Backup & Restore</h3>
              <p>Lakukan backup berkala untuk melindungi data penting:</p>
              <ul>
                <li>Backup otomatis setiap hari jam 02:00 WIB</li>
                <li>Backup manual dapat dilakukan melalui menu Sistem > Backup & Restore</li>
                <li>Simpan file backup di lokasi yang aman</li>
              </ul>
            </div>

            <div class="guide-card">
              <h3>System Monitoring</h3>
              <p>Pantau performa sistem secara real-time:</p>
              <ul>
                <li>CPU dan Memory usage</li>
                <li>Database performance</li>
                <li>User activity logs</li>
                <li>Error logs dan warnings</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Reports Guide -->
        <div class="help-section" id="reports">
          <h2>📊 Panduan Laporan</h2>
          <div class="guide-content">
            <div class="guide-card">
              <h3>Membuat Laporan User</h3>
              <p>Generate laporan detail tentang pengguna sistem:</p>
              <ul>
                <li>Laporan berdasarkan role</li>
                <li>Statistik aktivitas user</li>
                <li>Export ke format Excel/PDF</li>
              </ul>
            </div>

            <div class="guide-card">
              <h3>Laporan Performa</h3>
              <p>Analisis performa sistem dan user:</p>
              <ul>
                <li>Login frequency</li>
                <li>Materi yang paling diakses</li>
                <li>Completion rate tugas</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="help-section">
          <h2>📞 Butuh Bantuan Lebih Lanjut?</h2>
          <div class="contact-support">
            <div class="contact-card">
              <div class="contact-icon">📧</div>
              <h3>Email Support</h3>
              <p>admin@elearning.school.edu</p>
              <p class="response-time">Respon dalam 24 jam</p>
            </div>
            <div class="contact-card">
              <div class="contact-icon">📱</div>
              <h3>WhatsApp</h3>
              <p>+62 812-3456-7890</p>
              <p class="response-time">Respon dalam 2 jam</p>
            </div>
            <div class="contact-card">
              <div class="contact-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Tersedia 08:00 - 17:00 WIB</p>
              <button class="chat-btn">Mulai Chat</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SidebarAdmin from '../../../components/NavbarAdmin.vue';

export default {
  name: 'HelpAdmin',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      searchQuery: '',
      expandedFaq: null,
      faqs: [
        {
          question: 'Bagaimana cara menambah user baru?',
          answer: 'Untuk menambah user baru, buka menu Manajemen User, klik tombol "Tambah User", kemudian isi form yang tersedia.',
          steps: [
            'Buka menu Manajemen User di sidebar',
            'Klik tombol "+ Tambah User"',
            'Isi semua field yang diperlukan',
            'Klik "Simpan" untuk membuat user'
          ]
        },
        {
          question: 'Apa perbedaan role Admin, Guru, dan Siswa?',
          answer: 'Admin memiliki akses penuh ke sistem, Guru dapat mengelola materi dan tugas, sedangkan Siswa hanya dapat mengakses materi dan mengumpulkan tugas.',
          steps: null
        },
        {
          question: 'Bagaimana cara melakukan backup sistem?',
          answer: 'Backup dapat dilakukan melalui menu Sistem > Backup & Restore. Sistem juga melakukan backup otomatis setiap hari.',
          steps: [
            'Buka menu Sistem di sidebar',
            'Pilih "Backup & Restore"',
            'Klik "Buat Backup"',
            'Pilih lokasi penyimpanan',
            'Klik "Mulai Backup"'
          ]
        },
        {
          question: 'Bagaimana cara melihat log aktivitas user?',
          answer: 'Log aktivitas dapat dilihat melalui menu Sistem > System Logs. Anda dapat memfilter berdasarkan user, tanggal, dan jenis aktivitas.',
          steps: [
            'Buka menu Sistem di sidebar',
            'Pilih "System Logs"',
            'Gunakan filter untuk mencari log tertentu',
            'Klik pada log untuk melihat detail'
          ]
        },
        {
          question: 'Bagaimana cara mengaktifkan/nonaktifkan user?',
          answer: 'Untuk mengaktifkan/nonaktifkan user, buka daftar user, kemudian klik tombol "Aktifkan" atau "Nonaktifkan" sesuai status user saat ini.',
          steps: [
            'Buka daftar user di Manajemen User',
            'Cari user yang ingin diubah statusnya',
            'Klik tombol "Aktifkan" atau "Nonaktifkan"',
            'Konfirmasi perubahan status'
          ]
        }
      ]
    };
  },
  computed: {
    filteredFaqs() {
      if (!this.searchQuery) return this.faqs;
      return this.faqs.filter(faq => 
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    handleSidebarChange(collapsed) {
      this.sidebarCollapsed = collapsed;
    },
    toggleFaq(index) {
      this.expandedFaq = this.expandedFaq === index ? null : index;
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
.help-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.help-header {
  text-align: center;
  margin-bottom: 40px;
}

.help-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.help-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.search-section {
  margin-bottom: 40px;
}

.search-box {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 25px 0 0 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
}

.search-btn {
  padding: 15px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #2980b9;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.action-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.action-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.action-card p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.help-section {
  margin-bottom: 50px;
}

.help-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid #3498db;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.faq-item:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.faq-question {
  padding: 20px;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s;
}

.faq-question:hover {
  background: #e9ecef;
}

.faq-text {
  font-weight: 600;
  color: #2c3e50;
}

.faq-arrow {
  color: #3498db;
  font-weight: bold;
}

.faq-answer {
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.faq-answer p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.faq-steps h4 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.faq-steps ol {
  padding-left: 20px;
}

.faq-steps li {
  color: #555;
  margin-bottom: 8px;
  line-height: 1.5;
}

.guide-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
}

.guide-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.guide-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.step-number {
  background: #3498db;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h4 {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1rem;
}

.step-content p {
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.role-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.role-icon {
  font-size: 2rem;
}

.role-details h4 {
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 1rem;
}

.role-details p {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0;
}

.guide-card ul {
  padding-left: 20px;
}

.guide-card li {
  color: #555;
  margin-bottom: 8px;
  line-height: 1.5;
}

.contact-support {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.contact-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.contact-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.contact-card p {
  color: #555;
  margin-bottom: 5px;
}

.response-time {
  color: #7f8c8d;
  font-size: 0.9rem;
  font-style: italic;
}

.chat-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 15px;
  transition: background 0.3s;
}

.chat-btn:hover {
  background: #229954;
}

@media (max-width: 768px) {
  .help-container {
    padding: 15px;
  }
  
  .help-header h1 {
    font-size: 2rem;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .guide-content {
    grid-template-columns: 1fr;
  }
  
  .contact-support {
    grid-template-columns: 1fr;
  }
}
</style>
