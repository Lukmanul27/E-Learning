<template>
    <div class="dashboard-layout">
        <SidebarAdmin @sidebar-change="handleSidebarChange" />

        <main class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
            <div class="dashboard-container admin-system">
                <!-- Header Section -->
                <div class="page-header">
                    <h1>⚙️ System Management</h1>
                    <p class="page-description">Kelola pengaturan sistem dan monitoring</p>
                </div>
                <!-- Performance Monitoring -->
                <div class="performance-monitoring">
                    <div class="section-header">
                        <h2>📈 Performance Monitoring</h2>
                        <button class="btn-outline" @click="refreshMetrics">🔄 Refresh</button>
                    </div>

                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h3>CPU Usage</h3>
                            <div class="metric-value">{{ cpuUsage }}%</div>
                            <div class="metric-bar">
                                <div class="metric-fill" :style="{ width: cpuUsage + '%' }"></div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <h3>Memory Usage</h3>
                            <div class="metric-value">{{ memoryUsage }}%</div>
                            <div class="metric-bar">
                                <div class="metric-fill" :style="{ width: memoryUsage + '%' }"></div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <h3>Disk I/O</h3>
                            <div class="metric-value">{{ diskIO }} MB/s</div>
                            <div class="metric-bar">
                                <div class="metric-fill" :style="{ width: Math.min(diskIO / 100, 100) + '%' }"></div>
                            </div>
                        </div>

                        <div class="metric-card">
                            <h3>Network</h3>
                            <div class="metric-value">{{ networkUsage }} Mbps</div>
                            <div class="metric-bar">
                                <div class="metric-fill" :style="{ width: Math.min(networkUsage / 1000, 100) + '%' }">
                                </div>
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
    name: 'AdminSystem',
    components: {
        SidebarAdmin
    },
    data() {
        return {
            sidebarCollapsed: false,
            logLevel: '',
            logSearch: '',
            serverStatus: { text: 'Online', class: 'status-online' },
            storageUsage: 65,
            activeUsers: 127,
            performanceStatus: { text: 'Good', class: 'status-good' },
            cpuUsage: 45,
            memoryUsage: 72,
            diskIO: 25,
            networkUsage: 150,
            logs: [
                {
                    id: 1,
                    timestamp: new Date(Date.now() - 1000 * 60 * 5),
                    level: 'info',
                    message: 'User login successful',
                    source: 'auth.service'
                },
                {
                    id: 2,
                    timestamp: new Date(Date.now() - 1000 * 60 * 10),
                    level: 'warning',
                    message: 'High memory usage detected',
                    source: 'monitor.service'
                },
                {
                    id: 3,
                    timestamp: new Date(Date.now() - 1000 * 60 * 15),
                    level: 'error',
                    message: 'Database connection timeout',
                    source: 'database.service'
                },
                {
                    id: 4,
                    timestamp: new Date(Date.now() - 1000 * 60 * 20),
                    level: 'info',
                    message: 'Backup completed successfully',
                    source: 'backup.service'
                }
            ]
        }
    },
    computed: {
        filteredLogs() {
            let filtered = this.logs;

            if (this.logLevel) {
                filtered = filtered.filter(log => log.level === this.logLevel);
            }

            if (this.logSearch) {
                filtered = filtered.filter(log =>
                    log.message.toLowerCase().includes(this.logSearch.toLowerCase()) ||
                    log.source.toLowerCase().includes(this.logSearch.toLowerCase())
                );
            }

            return filtered;
        }
    },
    methods: {
        handleSidebarChange(data) {
            this.sidebarCollapsed = data.collapsed;
        },
        formatTime(timestamp) {
            return timestamp.toLocaleTimeString('id-ID');
        },
        getLogLevelClass(level) {
            const classes = {
                'info': 'level-info',
                'warning': 'level-warning',
                'error': 'level-error',
                'critical': 'level-critical'
            };
            return classes[level] || 'level-info';
        },
        backupSystem() {
            if (confirm('Start system backup? This may take several minutes.')) {
                alert('Backup started successfully');
                // API call to start backup
            }
        },
        clearLogs() {
            if (confirm('Clear all system logs? This action cannot be undone.')) {
                this.logs = [];
                alert('Logs cleared successfully');
            }
        },
        restartSystem() {
            if (confirm('Restart the system? All users will be disconnected.')) {
                alert('System restart initiated');
                // API call to restart system
            }
        },
        shutdownSystem() {
            if (confirm('Shutdown the system? This will stop all services.')) {
                alert('System shutdown initiated');
                // API call to shutdown system
            }
        },
        refreshLogs() {
            // Simulate refreshing logs
            alert('Logs refreshed');
        },
        refreshMetrics() {
            // Simulate refreshing metrics
            this.cpuUsage = Math.floor(Math.random() * 100);
            this.memoryUsage = Math.floor(Math.random() * 100);
            this.diskIO = Math.floor(Math.random() * 100);
            this.networkUsage = Math.floor(Math.random() * 1000);
            alert('Metrics refreshed');
        }
    }
}
</script>

<style scoped>
.admin-system {
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

.system-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.overview-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.card-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-content h3 {
    margin: 0 0 0.5rem 0;
    color: #374151;
    font-size: 1rem;
}

.status-text {
    margin: 0;
    font-weight: 600;
    font-size: 1.25rem;
}

.status-online {
    color: #059669;
}

.status-offline {
    color: #dc2626;
}

.status-good {
    color: #059669;
}

.status-warning {
    color: #d97706;
}

.status-poor {
    color: #dc2626;
}

.system-actions {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    margin-bottom: 2rem;
}

.action-section h2 {
    margin: 0 0 1rem 0;
    color: #111827;
    font-size: 1.25rem;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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

.btn-secondary {
    background: #6b7280;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
}

.btn-secondary:hover {
    background: #4b5563;
}

.btn-warning {
    background: #d97706;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
}

.btn-warning:hover {
    background: #b45309;
}

.btn-danger {
    background: #dc2626;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
}

.btn-danger:hover {
    background: #b91c1c;
}

.system-logs {
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

.log-filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.filter-select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.875rem;
}

.search-input {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.875rem;
    min-width: 200px;
}

.logs-table {
    max-height: 400px;
    overflow-y: auto;
}

.log-entry {
    display: grid;
    grid-template-columns: 120px 80px 1fr 150px;
    gap: 1rem;
    padding: 0.75rem;
    border-bottom: 1px solid #f3f4f6;
    align-items: center;
    font-size: 0.875rem;
}

.log-entry:hover {
    background: #f9fafb;
}

.log-timestamp {
    color: #6b7280;
    font-family: monospace;
}

.log-level {
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
}

.level-info {
    background: #dbeafe;
    color: #1e40af;
}

.level-warning {
    background: #fef3c7;
    color: #d97706;
}

.level-error {
    background: #fee2e2;
    color: #dc2626;
}

.level-critical {
    background: #fef2f2;
    color: #991b1b;
}

.log-message {
    color: #374151;
}

.log-source {
    color: #6b7280;
    font-family: monospace;
}

.performance-monitoring {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.metric-card {
    text-align: center;
}

.metric-card h3 {
    margin: 0 0 1rem 0;
    color: #374151;
    font-size: 1rem;
}

.metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
}

.metric-bar {
    width: 100%;
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

/* Responsive */
@media (max-width: 768px) {
    .admin-system {
        padding: 1rem;
    }

    .system-overview {
        grid-template-columns: 1fr;
    }

    .action-buttons {
        flex-direction: column;
    }

    .log-entry {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }

    .metrics-grid {
        grid-template-columns: 1fr;
    }
}
</style>