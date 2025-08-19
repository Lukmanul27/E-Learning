<template>
  <div id="app">
    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg);
  color: var(--text);
}

#app {
  height: 100vh;
  overflow: hidden;
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Import global styles */
@import './style.css';

/* Ensure proper layout for dashboard pages */
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 0;
  overflow-y: auto;
  background: var(--bg);
  transition: margin-left 0.2s ease;
}

.main-content.sidebar-collapsed {
  margin-left: 72px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
  
  .main-content.sidebar-collapsed {
    margin-left: 0;
  }
}
</style>
