<template>
  <div class="card-materi">
    <div class="card-header">
      <h3 class="card-title">{{ materi.judul }}</h3>
      <span class="card-subject">{{ materi.mataPelajaran }}</span>
    </div>
    <div class="card-content">
      <p class="card-description">{{ materi.deskripsi }}</p>
      <div class="card-meta">
        <span class="meta-item">📅 {{ materi.tanggal }}</span>
        <span class="meta-item">👨‍🏫 {{ materi.guru }}</span>
      </div>
    </div>
    <div class="card-actions">
      <button class="btn-primary" @click="viewMateri">Lihat Materi</button>
      <button class="btn-secondary" @click="downloadMateri">Download</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardMateri',
  props: {
    materi: {
      type: Object,
      required: true,
      default: () => ({
        judul: 'Judul Materi',
        mataPelajaran: 'Mata Pelajaran',
        deskripsi: 'Deskripsi materi pembelajaran',
        tanggal: '2024-01-01',
        guru: 'Nama Guru'
      })
    }
  },
  methods: {
    viewMateri() {
      this.$emit('view-materi', this.materi);
    },
    downloadMateri() {
      this.$emit('download-materi', this.materi);
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
}

.meta-item {
  font-size: 0.85rem;
  color: var(--text-light);
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
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-1px);
}
</style>
