# E-Learning
# E-Learning Platform

A comprehensive E-Learning platform built with Vue.js for educational institutions.

## Features

### Admin Panel
- **Dashboard**: Overview of system statistics and user activities
- **User Management**: Manage users (Admin, Guru, Operator, Siswa)
- **System Management**: Backup, restore, logs, and monitoring
- **Reports**: Generate various system reports
- **Settings**: Comprehensive system configuration
- **Help**: User guides and FAQ system

### Guru (Teacher) Panel
- **Dashboard**: Overview of classes and students
- **Materi Management**: Create and manage learning materials
- **Tugas Management**: Create and grade assignments
- **Student Progress**: Monitor student performance

### Operator Panel
- **Dashboard**: Administrative overview
- **Data Management**: Manage academic data

### Siswa (Student) Panel
- **Dashboard**: Learning progress overview
- **Materi Access**: View and download learning materials
- **Tugas Submission**: Submit assignments and view grades

## Admin Features

### Settings (`/admin/settings`)
The admin settings page provides comprehensive system configuration:

#### General Settings
- Institution information (name, address, contact details)
- System preferences (timezone, language, date format)
- File upload limits

#### User Management Settings
- Password policies (length, complexity requirements)
- Account security (login attempts, lockout duration)
- Email verification settings

#### Security Settings
- Two-factor authentication configuration
- Session timeout settings
- IP whitelist management
- Backup and recovery settings

#### Notification Settings
- SMTP configuration for email notifications
- Notification type preferences
- System alert settings

### Help System (`/admin/help`)
The help system provides comprehensive support for administrators:

#### Search Functionality
- Search across all help content
- Quick access to common topics

#### FAQ Section
- Frequently asked questions with detailed answers
- Step-by-step guides for common tasks
- Expandable/collapsible content

#### User Management Guide
- Step-by-step instructions for adding users
- Role management explanations
- User status management

#### System Guide
- Backup and restore procedures
- System monitoring guidelines
- Security best practices

#### Reports Guide
- User report generation
- Performance analytics
- Export functionality

#### Contact Support
- Multiple support channels (email, WhatsApp, live chat)
- Response time expectations
- Support availability

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Technology Stack

- **Frontend**: Vue.js 3, Vue Router
- **Styling**: CSS3 with custom design system
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page components
│   ├── admin/          # Admin panel views
│   ├── guru/           # Teacher panel views
│   ├── operator/       # Operator panel views
│   └── siswa/          # Student panel views
├── router.js           # Vue Router configuration
├── main.js            # Vue app entry point
└── style.css          # Global styles and CSS variables
```

## Usage

1. **Login**: Access the platform with appropriate credentials
2. **Role-based Access**: Different features based on user role
3. **Navigation**: Use the sidebar navigation for different sections
4. **Responsive Design**: Works on desktop and mobile devices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
