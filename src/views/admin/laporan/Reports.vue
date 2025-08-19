<template>
  <div class="dashboard-layout">
    <SidebarAdmin @sidebar-change="handleSidebarChange" />
    
    <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="dashboard-container admin-reports">
        <!-- Header Section -->
        <div class="page-header">
          <h1>📊 Reports & Analytics</h1>
          <p class="page-description">Lihat laporan dan analisis sistem E-Learning</p>
        </div>

        <!-- Report Filters -->
        <div class="report-filters">
          <div class="filter-group">
            <label>Periode</label>
            <select v-model="selectedPeriod" class="filter-select">
              <option value="today">Hari Ini</option>
              <option value="week">Minggu Ini</option>
              <option value="month">Bulan Ini</option>
              <option value="quarter">Kuartal Ini</option>
              <option value="year">Tahun Ini</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>Jenis Report</label>
            <select v-model="selectedReportType" class="filter-select">
              <option value="users">Users</option>
              <option value="activities">Activities</option>
              <option value="performance">Performance</option>
            </select>
          </div>
          
          <button class="btn-primary" @click="generateReport">
            📊 Generate Report
          </button>
        </div>

        <!-- Quick Stats -->
        <div class="quick-stats">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
              <h3>Total Users</h3>
              <div class="stat-value">{{ totalUsers }}</div>
              <div class="stat-change positive">+{{ userGrowth }}% dari bulan lalu</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <h3>Total Materi</h3>
              <div class="stat-value">{{ totalMateri }}</div>
              <div class="stat-change positive">+{{ materiGrowth }}% dari bulan lalu</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-content">
              <h3>Total Tugas</h3>
              <div class="stat-value">{{ totalTugas }}</div>
              <div class="stat-change positive">+{{ tugasGrowth }}% dari bulan lalu</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <h3>Completion Rate</h3>
              <div class="stat-value">{{ completionRate }}%</div>
              <div class="stat-change positive">+{{ completionGrowth }}% dari bulan lalu</div>
            </div>
          </div>
        </div>

        <!-- User Activity Report -->
        <div v-if="selectedReportType === 'users'" class="report-section">
          <div class="section-header">
            <h2>👥 User Activity Report</h2>
            <button class="btn-outline" @click="exportReport('users')">📥 Export</button>
          </div>
          
          <div class="user-activity-chart">
            <div class="chart-container">
              <div class="chart-bar" v-for="(data, index) in userActivityData" :key="index">
                <div class="bar-label">{{ data.label }}</div>
                <div class="bar-container">
                  <div class="bar-fill" :style="{ height: (data.value / maxUserActivity) * 200 + 'px' }"></div>
                </div>
                <div class="bar-value">{{ data.value }}</div>
              </div>
            </div>
          </div>
          
          <div class="user-table">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Total Users</th>
                  <th>Active Users</th>
                  <th>New This Month</th>
                  <th>Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="role in userRoleData" :key="role.role">
                  <td>
                    <span class="role-badge" :class="getRoleClass(role.role)">
                      {{ role.role }}
                    </span>
                  </td>
                  <td>{{ role.total }}</td>
                  <td>{{ role.active }}</td>
                  <td>{{ role.new }}</td>
                  <td>
                    <span class="growth-rate" :class="role.growth >= 0 ? 'positive' : 'negative'">
                      {{ role.growth >= 0 ? '+' : '' }}{{ role.growth }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Activity Report -->
        <div v-if="selectedReportType === 'activities'" class="report-section">
          <div class="section-header">
            <h2>📈 Activity Report</h2>
            <button class="btn-outline" @click="exportReport('activities')">📥 Export</button>
          </div>
          
          <div class="activity-metrics">
            <div class="metric-row">
              <div class="metric-label">Login Activity</div>
              <div class="metric-bar">
                <div class="metric-fill" :style="{ width: loginActivity + '%' }"></div>
              </div>
              <div class="metric-value">{{ loginActivity }}%</div>
            </div>
            
            <div class="metric-row">
              <div class="metric-label">Content Access</div>
              <div class="metric-bar">
                <div class="metric-fill" :style="{ width: contentAccess + '%' }"></div>
              </div>
              <div class="metric-value">{{ contentAccess }}%</div>
            </div>
            
            <div class="metric-row">
              <div class="metric-label">Assignment Completion</div>
              <div class="metric-bar">
                <div class="metric-fill" :style="{ width: assignmentCompletion + '%' }"></div>
              </div>
              <div class="metric-value">{{ assignmentCompletion }}%</div>
            </div>
          </div>
          
          <div class="activity-timeline">
            <h3>Activity Timeline</h3>
            <div class="timeline">
              <div class="timeline-item" v-for="activity in activityTimeline" :key="activity.id">
                <div class="timeline-time">{{ formatTime(activity.time) }}</div>
                <div class="timeline-content">
                  <div class="activity-type">{{ activity.type }}</div>
                  <div class="activity-desc">{{ activity.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Report -->
        <div v-if="selectedReportType === 'performance'" class="report-section">
          <div class="section-header">
            <h2>⚡ Performance Report</h2>
            <button class="btn-outline" @click="exportReport('performance')">📥 Export</button>
          </div>
          
          <div class="performance-grid">
            <div class="perf-card">
              <h3>System Uptime</h3>
              <div class="perf-value">{{ systemUptime }}%</div>
              <div class="perf-status" :class="getUptimeClass(systemUptime)">
                {{ getUptimeStatus(systemUptime) }}
              </div>
            </div>
            
            <div class="perf-card">
              <h3>Response Time</h3>
              <div class="perf-value">{{ responseTime }}ms</div>
              <div class="perf-status" :class="getResponseClass(responseTime)">
                {{ getResponseStatus(responseTime) }}
              </div>
            </div>
            
            <div class="perf-card">
              <h3>Error Rate</h3>
              <div class="perf-value">{{ errorRate }}%</div>
              <div class="perf-status" :class="getErrorClass(errorRate)">
                {{ getErrorStatus(errorRate) }}
              </div>
            </div>
            
            <div class="perf-card">
              <h3>User Satisfaction</h3>
              <div class="perf-value">{{ userSatisfaction }}/5</div>
              <div class="perf-status" :class="getSatisfactionClass(userSatisfaction)">
                {{ getSatisfactionStatus(userSatisfaction) }}
              </div>
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
  name: 'AdminReports',
  components: {
    SidebarAdmin
  },
  data() {
    return {
      sidebarCollapsed: false,
      selectedPeriod: 'month',
      selectedReportType: 'users',
      totalUsers: 1247,
      userGrowth: 12,
      totalMateri: 89,
      materiGrowth: 8,
      totalTugas: 156,
      tugasGrowth: 15,
      completionRate: 78,
      completionGrowth: 5,
      loginActivity: 85,
      contentAccess: 72,
      assignmentCompletion: 68,
      systemUptime: 99.8,
      responseTime: 245,
      errorRate: 0.2,
      userSatisfaction: 4.2,
      userActivityData: [
        { label: 'Jan', value: 120 },
        { label: 'Feb', value: 135 },
        { label: 'Mar', value: 142 },
        { label: 'Apr', value: 158 },
        { label: 'May', value: 167 },
        { label: 'Jun', value: 189 }
      ],
      userRoleData: [
        { role: 'admin', total: 5, active: 5, new: 0, growth: 0 },
        { role: 'operator', total: 12, active: 11, new: 1, growth: 9 },
        { role: 'guru', total: 45, active: 42, new: 3, growth: 7 },
        { role: 'siswa', total: 1185, active: 1156, new: 29, growth: 2.5 }
      ],
      activityTimeline: [
        {
          id: 1,
          time: new Date(Date.now() - 1000 * 60 * 30),
          type: 'Login',
          description: 'User login successful'
        },
        {
          id: 2,
          time: new Date(Date.now() - 1000 * 60 * 45),
          type: 'Content Access',
          description: 'Materi downloaded'
        },
        {
          id: 3,
          time: new Date(Date.now() - 1000 * 60 * 60),
          type: 'Assignment',
          description: 'Tugas submitted'
        }
      ]
    }
  },
  computed: {
    maxUserActivity() {
      return Math.max(...this.userActivityData.map(d => d.value));
    }
  },
  methods: {
    handleSidebarChange(data) {
      this.sidebarCollapsed = data.collapsed;
    },
    generateReport() {
      alert(`Generating ${this.selectedReportType} report for ${this.selectedPeriod}`);
      // API call to generate report
    },
    exportReport(type) {
      alert(`Exporting ${type} report...`);
      // API call to export report
    },
    getRoleClass(role) {
      const classes = {
        'admin': 'role-admin',
        'guru': 'role-guru',
        'siswa': 'role-siswa',
        'operator': 'role-operator'
      };
      return classes[role] || 'role-default';
    },
    formatTime(timestamp) {
      return timestamp.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },
    getUptimeClass(uptime) {
      if (uptime >= 99.9) return 'status-excellent';
      if (uptime >= 99.5) return 'status-good';
      if (uptime >= 99.0) return 'status-warning';
      return 'status-poor';
    },
    getUptimeStatus(uptime) {
      if (uptime >= 99.9) return 'Excellent';
      if (uptime >= 99.5) return 'Good';
      if (uptime >= 99.0) return 'Fair';
      return 'Poor';
    },
    getResponseClass(response) {
      if (response <= 200) return 'status-excellent';
      if (response <= 500) return 'status-good';
      if (response <= 1000) return 'status-warning';
      return 'status-poor';
    },
    getResponseStatus(response) {
      if (response <= 200) return 'Excellent';
      if (response <= 500) return 'Good';
      if (response <= 1000) return 'Fair';
      return 'Poor';
    },
    getErrorClass(error) {
      if (error <= 0.1) return 'status-excellent';
      if (error <= 0.5) return 'status-good';
      if (error <= 1.0) return 'status-warning';
      return 'status-poor';
    },
    getErrorStatus(error) {
      if (error <= 0.1) return 'Excellent';
      if (error <= 0.5) return 'Good';
      if (error <= 1.0) return 'Fair';
      return 'Poor';
    },
    getSatisfactionClass(satisfaction) {
      if (satisfaction >= 4.5) return 'status-excellent';
      if (satisfaction >= 4.0) return 'status-good';
      if (satisfaction >= 3.5) return 'status-warning';
      return 'status-poor';
    },
    getSatisfactionStatus(satisfaction) {
      if (satisfaction >= 4.5) return 'Excellent';
      if (satisfaction >= 4.0) return 'Good';
      if (satisfaction >= 3.5) return 'Fair';
      return 'Poor';
    }
  }
}
</script>

<style scoped>
.admin-reports {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.page-description {
  color: #6b7280;
  font-size: 1.1rem;
}

.report-filters {
  display: flex;
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-width: 150px;
}

.btn-primary {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
}

.btn-primary:hover {
  background: #b91c1c;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content h3 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 0.875rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.stat-change {
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-change.positive {
  color: #059669;
}

.stat-change.negative {
  color: #dc2626;
}

.report-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: #111827;
  font-size: 1.25rem;
}

.btn-outline {
  background: transparent;
  color: #dc2626;
  border: 1px solid #dc2626;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #dc2626;
  color: white;
}

.user-activity-chart {
  margin-bottom: 2rem;
}

.chart-container {
  display: flex;
  align-items: end;
  gap: 1rem;
  height: 250px;
  padding: 1rem 0;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.bar-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.bar-container {
  width: 100%;
  height: 200px;
  background: #f3f4f6;
  border-radius: 4px;
  display: flex;
  align-items: end;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  background: #dc2626;
  transition: height 0.3s ease;
}

.bar-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-top: 0.5rem;
}

.user-table table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
}

.user-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.role-admin {
  background: #dc2626;
  color: white;
}

.role-guru {
  background: #059669;
  color: white;
}

.role-siswa {
  background: #3b82f6;
  color: white;
}

.role-operator {
  background: #7c3aed;
  color: white;
}

.growth-rate {
  font-weight: 600;
}

.growth-rate.positive {
  color: #059669;
}

.growth-rate.negative {
  color: #dc2626;
}

.activity-metrics {
  margin-bottom: 2rem;
}

.metric-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric-label {
  min-width: 150px;
  font-weight: 500;
  color: #374151;
}

.metric-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: #dc2626;
  transition: width 0.3s ease;
}

.metric-value {
  min-width: 60px;
  font-weight: 600;
  color: #111827;
  text-align: right;
}

.activity-timeline h3 {
  margin: 0 0 1rem 0;
  color: #111827;
  font-size: 1.125rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.timeline-time {
  font-size: 0.875rem;
  color: #6b7280;
  font-family: monospace;
  min-width: 80px;
}

.timeline-content {
  flex: 1;
}

.activity-type {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.activity-desc {
  color: #6b7280;
  font-size: 0.875rem;
}

.performance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.perf-card {
  text-align: center;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 8px;
}

.perf-card h3 {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 1rem;
}

.perf-value {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.perf-status {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.status-excellent {
  background: #dcfce7;
  color: #166534;
}

.status-good {
  background: #dbeafe;
  color: #1e40af;
}

.status-warning {
  background: #fef3c7;
  color: #d97706;
}

.status-poor {
  background: #fee2e2;
  color: #dc2626;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-reports {
    padding: 1rem;
  }
  
  .report-filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .quick-stats {
    grid-template-columns: 1fr;
  }
  
  .chart-container {
    flex-direction: column;
    height: auto;
    gap: 0.5rem;
  }
  
  .chart-bar {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  
  .bar-container {
    width: 100px;
    height: 8px;
  }
  
  .bar-fill {
    height: 100%;
    width: var(--bar-width);
  }
  
  .performance-grid {
    grid-template-columns: 1fr;
  }
}
</style>
