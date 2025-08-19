<template>
  <div class="card-tugas">
    <div class="card-header">
      <h3 class="card-title">{{ tugas.judul }}</h3>
      <span class="card-subject">{{ tugas.mataPelajaran }}</span>
    </div>
    <div class="card-content">
      <p class="card-description">{{ tugas.deskripsi }}</p>
      <div class="card-meta">
        <span class="meta-item">📅 Deadline: {{ tugas.deadline }}</span>
        <span class="meta-item">⏰ Durasi: {{ tugas.durasi }}</span>
        <span class="meta-item">👨‍🏫 {{ tugas.guru }}</span>
      </div>
      <div class="tugas-status" v-if="tugas.status">
        <span class="status-badge" :class="getStatusClass(tugas.status)">
          {{ getStatusText(tugas.status) }}
        </span>
      </div>
    </div>
    <div class="card-actions">
      <button class="btn-primary" @click="mulaiTugas" v-if="tugas.status === 'belum_dikerjakan'">
        Mulai Tugas
      </button>
      <button class="btn-secondary" @click="lanjutkanTugas" v-if="tugas.status === 'sedang_dikerjakan'">
        Lanjutkan
      </button>
      <button class="btn-success" @click="lihatHasil" v-if="tugas.status === 'selesai'">
        Lihat Hasil
      </button>
      <button class="btn-outline" @click="lihatDetail">
        Detail
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTugas',
  props: {
    tugas: {
      type: Object,
      required: true,
      default: () => ({
        judul: 'Judul Tugas',
        mataPelajaran: 'Mata Pelajaran',
        deskripsi: 'Deskripsi tugas yang harus dikerjakan',
        deadline: '2024-01-01',
        durasi: '60 menit',
        guru: 'Nama Guru',
        status: 'belum_dikerjakan'
      })
    }
  },
  methods: {
    mulaiTugas() {
      this.$emit('mulai-tugas', this.tugas);
    },
    lanjutkanTugas() {
      this.$emit('lanjutkan-tugas', this.tugas);
    },
    lihatHasil() {
      this.$emit('lihat-hasil', this.tugas);
    },
    lihatDetail() {
      this.$emit('lihat-detail', this.tugas);
    },
    getStatusClass(status) {
      const statusClasses = {
        'belum_dikerjakan': 'status-pending',
        'sedang_dikerjakan': 'status-progress',
        'selesai': 'status-completed'
      };
      return statusClasses[status] || 'status-pending';
    },
    getStatusText(status) {
      const statusTexts = {
        'belum_dikerjakan': 'Belum Dikerjakan',
        'sedang_dikerjakan': 'Sedang Dikerjakan',
        'selesai': 'Selesai'
      };
      return statusTexts[status] || 'Belum Dikerjakan';
    }
  }
}
</script>

<style scoped>
.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.card-subject {
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 500;
  background: rgba(37, 99, 235, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  display: inline-block;
}

.card-content {
  margin-bottom: 1.5rem;
}

.card-description {
  color: var(--text-light);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.meta-item {
  font-size: 0.85rem;
  color: var(--text-light);
}

.tugas-status {
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.status-progress {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.status-completed {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}

.btn-secondary:hover {
  background: #d97706;
  transform: translateY(-1px);
}

.btn-success {
  background: #22c55e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}

.btn-success:hover {
  background: #16a34a;
  transform: translateY(-1px);
}

.btn-outline {
  background: transparent;
  color: var(--text-light);
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}

.btn-outline:hover {
  background: #f3f4f6;
  border-color: var(--text-light);
  transform: translateY(-1px);
}
</style>
