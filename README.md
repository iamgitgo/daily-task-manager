# 📋 Daily Task Manager

A simple, elegant task management application that automatically carries over your daily tasks. Built with React, Vite, and Tailwind CSS.

![Daily Task Manager](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔄 **Auto-Repeat Tasks**
- Tasks automatically carry over to the next day with checkboxes reset
- No need to re-add recurring daily tasks
- Perfect for habits, prayers, or regular activities

### ✅ **Task Management**
- ➕ Add new tasks quickly
- ✏️ Edit tasks by clicking on them
- ✓ Check/uncheck completed tasks
- 🗑️ Delete tasks you no longer need
- 🔀 Drag & drop to reorder tasks

### 📅 **History Tracking**
- View all your past tasks organized by date
- Search for tasks on any specific date
- See completion statistics for each day
- Track your productivity over time

### 💾 **Export/Import**
- **Export Today**: Save current day's tasks
- **Export All**: Backup entire task history
- **Import**: Restore tasks on any device
- Cross-device synchronization via file transfer

### 🎨 **User Interface**
- Clean, modern design
- Responsive layout (works on mobile & desktop)
- Smooth animations and transitions
- No page scrolling - tasks scroll independently

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed:
```bash
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/daily-task-manager.git
cd daily-task-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
Navigate to http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy.

### Preview Production Build

```bash
npm run preview
```

## 📖 How It Works

### Data Storage
- Uses **localStorage** for persistent data storage
- Data is stored in your browser (no server required)
- Tasks are organized by date: `tasks:YYYY-MM-DD`

### Auto-Repeat Mechanism
1. App checks the current date every minute
2. When a new day starts, it looks for yesterday's tasks
3. Copies all tasks with completion status reset
4. Previous day's data remains in history

### Task Operations
- **Add**: Creates a new task with unique ID and timestamp
- **Edit**: Click on task text to enable inline editing
- **Complete**: Toggle checkbox to mark as done
- **Reorder**: Drag tasks up/down to change order
- **Delete**: Remove tasks permanently

### Export/Import Flow
```
Laptop                    Mobile
  ├─ Export All    ──→    Transfer file (email/drive/etc.)
  └─ tasks.json    ──→    Import ──→ All tasks synced!
```

## 🗂️ Project Structure

```
daily-task-manager/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## 🛠️ Technologies Used

- **React 18.2** - UI library
- **Vite 4.5** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **localStorage API** - Browser storage

## 💡 Usage Tips

### Daily Workflow
1. Open the app every morning
2. Your tasks from yesterday appear automatically (unchecked)
3. Add new tasks if needed
4. Check off tasks as you complete them
5. Tasks carry over to tomorrow automatically

### Syncing Between Devices
1. On your primary device: Click **"Export All"**
2. Transfer the JSON file to your other device
3. On the other device: Click **"Import"** and select the file
4. All your tasks and history are now synced!

### Keyboard Shortcuts
- **Enter**: Add new task (when typing in input field)
- **Enter**: Save edited task
- **Escape**: Cancel editing

## 🔒 Privacy & Security

- **100% Local**: All data stays in your browser
- **No Server**: No data sent to external servers
- **No Tracking**: No analytics or tracking scripts
- **Offline First**: Works without internet connection

## 🐛 Troubleshooting

### Tasks not appearing?
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reloading

### Styles not loading?
- Make sure `npm install` completed successfully
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Import not working?
- Ensure the JSON file is not corrupted
- Check that you're selecting a `.json` file

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Design inspiration from modern task management apps
- Built with love for productivity enthusiasts

## 📸 Screenshots

### Main Interface
![Main Interface](screenshots/main.png)

### Task History
![History View](screenshots/history.png)

### Export/Import
![Export Import](screenshots/export-import.png)

---

**⭐ If you find this project useful, please consider giving it a star!**

## 🔄 Changelog

### v1.0.0 (2025-11-03)
- Initial release
- Auto-repeat daily tasks
- Task history with date search
- Export/Import functionality
- Drag & drop reordering
- Inline task editing
