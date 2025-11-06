import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, History, X, RefreshCw, Download, Upload, RotateCw, Palette, Languages } from 'lucide-react';

const translations = {
  en: {
    name: 'English',
    dailyTasks: 'Taqwa Tracker',
    home: 'Home',
    addTask: 'Add Task',
    export: 'Export',
    history: 'History',
    addNewTask: 'Add New Task',
    enterTaskName: 'Enter task name...',
    cancel: 'Cancel',
    add: 'Add',
    completed: 'completed',
    of: 'of',
    noTasksToday: 'No tasks for today. Add one to get started!',
    autoRepeat: 'Auto-Repeat:',
    autoRepeatDesc: 'Your tasks automatically carry over to the next day (unchecked), so you don\'t need to re-add them!',
    chooseTheme: 'Choose Theme',
    active: 'Active',
    exportImport: 'Export / Import',
    exportToday: 'Export Today\'s Tasks',
    exportAll: 'Export All History',
    importTasks: 'Import Tasks',
    taskHistory: 'Task History',
    searchByDate: 'Search by Date',
    noTasksDate: 'No tasks recorded for this date',
    selectDate: 'Select a date to view tasks',
    completedAt: 'Completed at',
    alreadyToday: 'Already showing today\'s tasks!',
    importSuccess: 'Successfully imported',
    daysHistory: 'days of task history!',
    importSuccessDate: 'Successfully imported tasks for',
    invalidFile: 'Invalid file format!',
    errorImporting: 'Error importing file:',
    chooseLanguage: 'Choose Language',
    defaultTasks: {
      tahajud: 'Tahajud Prayer',
      yasin: 'Surah Yasin',
      prayers: '5 Prayers',
      mulk: 'Surah Al-Mulk',
      durood: 'Durood 1000 times'
    }
  },
  ur: {
    name: 'اردو',
    dailyTasks: 'تقویٰ ٹریکر',
    home: 'ہوم',
    addTask: 'کام شامل کریں',
    export: 'ایکسپورٹ',
    history: 'تاریخ',
    addNewTask: 'نیا کام شامل کریں',
    enterTaskName: 'کام کا نام درج کریں...',
    cancel: 'منسوخ',
    add: 'شامل کریں',
    completed: 'مکمل',
    of: 'میں سے',
    noTasksToday: 'آج کے لیے کوئی کام نہیں۔ شروع کرنے کے لیے ایک شامل کریں!',
    autoRepeat: 'خودکار دہرائیں:',
    autoRepeatDesc: 'آپ کے کام خودکار طور پر اگلے دن میں منتقل ہو جاتے ہیں، لہذا آپ کو انہیں دوبارہ شامل کرنے کی ضرورت نہیں!',
    chooseTheme: 'تھیم منتخب کریں',
    active: 'فعال',
    exportImport: 'ایکسپورٹ / امپورٹ',
    exportToday: 'آج کے کام ایکسپورٹ کریں',
    exportAll: 'تمام تاریخ ایکسپورٹ کریں',
    importTasks: 'کام امپورٹ کریں',
    taskHistory: 'کام کی تاریخ',
    searchByDate: 'تاریخ کے لحاظ سے تلاش کریں',
    noTasksDate: 'اس تاریخ کے لیے کوئی کام ریکارڈ نہیں',
    selectDate: 'کام دیکھنے کے لیے تاریخ منتخب کریں',
    completedAt: 'مکمل ہوا',
    alreadyToday: 'پہلے سے آج کے کام دکھا رہے ہیں!',
    importSuccess: 'کامیابی سے امپورٹ کیا گیا',
    daysHistory: 'دنوں کی تاریخ!',
    importSuccessDate: 'کامیابی سے کام امپورٹ کیے گئے',
    invalidFile: 'غلط فائل فارمیٹ!',
    errorImporting: 'فائل امپورٹ کرنے میں خرابی:',
    chooseLanguage: 'زبان منتخب کریں',
    defaultTasks: {
      tahajud: 'تہجد کی نماز',
      yasin: 'سورہ یٰسین',
      prayers: '5 نمازیں',
      mulk: 'سورہ الملک',
      durood: 'درود 1000 مرتبہ'
    }
  },
  ar: {
    name: 'متتبع التقوى',
    dailyTasks: 'المهام اليومية',
    home: 'الرئيسية',
    addTask: 'إضافة مهمة',
    export: 'تصدير',
    history: 'السجل',
    addNewTask: 'إضافة مهمة جديدة',
    enterTaskName: 'أدخل اسم المهمة...',
    cancel: 'إلغاء',
    add: 'إضافة',
    completed: 'مكتمل',
    of: 'من',
    noTasksToday: 'لا توجد مهام لهذا اليوم. أضف واحدة للبدء!',
    autoRepeat: 'التكرار التلقائي:',
    autoRepeatDesc: 'تنتقل مهامك تلقائيًا إلى اليوم التالي (غير محددة)، لذلك لا تحتاج إلى إضافتها مرة أخرى!',
    chooseTheme: 'اختر السمة',
    active: 'نشط',
    exportImport: 'تصدير / استيراد',
    exportToday: 'تصدير مهام اليوم',
    exportAll: 'تصدير كل السجل',
    importTasks: 'استيراد المهام',
    taskHistory: 'سجل المهام',
    searchByDate: 'البحث بالتاريخ',
    noTasksDate: 'لا توجد مهام مسجلة لهذا التاريخ',
    selectDate: 'حدد تاريخًا لعرض المهام',
    completedAt: 'اكتمل في',
    alreadyToday: 'يتم عرض مهام اليوم بالفعل!',
    importSuccess: 'تم الاستيراد بنجاح',
    daysHistory: 'أيام من السجل!',
    importSuccessDate: 'تم استيراد المهام بنجاح لـ',
    invalidFile: 'تنسيق ملف غير صالح!',
    errorImporting: 'خطأ في استيراد الملف:',
    chooseLanguage: 'اختر اللغة',
    defaultTasks: {
      tahajud: 'صلاة التهجد',
      yasin: 'سورة يس',
      prayers: '5 صلوات',
      mulk: 'سورة الملك',
      durood: 'الصلاة على النبي 1000 مرة'
    }
  },
  es: {
    name: 'Español',
    dailyTasks: 'Rastreador de Taqwa',
    home: 'Inicio',
    addTask: 'Agregar Tarea',
    export: 'Exportar',
    history: 'Historial',
    addNewTask: 'Agregar Nueva Tarea',
    enterTaskName: 'Ingrese el nombre de la tarea...',
    cancel: 'Cancelar',
    add: 'Agregar',
    completed: 'completado',
    of: 'de',
    noTasksToday: '¡No hay tareas para hoy. Agrega una para comenzar!',
    autoRepeat: 'Repetición Automática:',
    autoRepeatDesc: '¡Tus tareas se transfieren automáticamente al día siguiente (sin marcar), por lo que no necesitas volver a agregarlas!',
    chooseTheme: 'Elegir Tema',
    active: 'Activo',
    exportImport: 'Exportar / Importar',
    exportToday: 'Exportar Tareas de Hoy',
    exportAll: 'Exportar Todo el Historial',
    importTasks: 'Importar Tareas',
    taskHistory: 'Historial de Tareas',
    searchByDate: 'Buscar por Fecha',
    noTasksDate: 'No hay tareas registradas para esta fecha',
    selectDate: 'Selecciona una fecha para ver las tareas',
    completedAt: 'Completado a las',
    alreadyToday: '¡Ya se muestran las tareas de hoy!',
    importSuccess: 'Importado exitosamente',
    daysHistory: 'días de historial!',
    importSuccessDate: 'Tareas importadas exitosamente para',
    invalidFile: '¡Formato de archivo inválido!',
    errorImporting: 'Error al importar el archivo:',
    chooseLanguage: 'Elegir Idioma',
    defaultTasks: {
      tahajud: 'Oración Tahajud',
      yasin: 'Surah Yasin',
      prayers: '5 Oraciones',
      mulk: 'Surah Al-Mulk',
      durood: 'Durood 1000 veces'
    }
  },
  fr: {
    name: 'Français',
    dailyTasks: 'Suivi de Taqwa',
    home: 'Accueil',
    addTask: 'Ajouter Tâche',
    export: 'Exporter',
    history: 'Historique',
    addNewTask: 'Ajouter Nouvelle Tâche',
    enterTaskName: 'Entrez le nom de la tâche...',
    cancel: 'Annuler',
    add: 'Ajouter',
    completed: 'terminé',
    of: 'sur',
    noTasksToday: 'Aucune tâche pour aujourd\'hui. Ajoutez-en une pour commencer!',
    autoRepeat: 'Répétition Automatique:',
    autoRepeatDesc: 'Vos tâches sont automatiquement reportées au jour suivant (non cochées), vous n\'avez donc pas besoin de les rajouter!',
    chooseTheme: 'Choisir le Thème',
    active: 'Actif',
    exportImport: 'Exporter / Importer',
    exportToday: 'Exporter les Tâches d\'Aujourd\'hui',
    exportAll: 'Exporter Tout l\'Historique',
    importTasks: 'Importer des Tâches',
    taskHistory: 'Historique des Tâches',
    searchByDate: 'Rechercher par Date',
    noTasksDate: 'Aucune tâche enregistrée pour cette date',
    selectDate: 'Sélectionnez une date pour voir les tâches',
    completedAt: 'Terminé à',
    alreadyToday: 'Affiche déjà les tâches d\'aujourd\'hui!',
    importSuccess: 'Importé avec succès',
    daysHistory: 'jours d\'historique!',
    importSuccessDate: 'Tâches importées avec succès pour',
    invalidFile: 'Format de fichier invalide!',
    errorImporting: 'Erreur lors de l\'importation du fichier:',
    chooseLanguage: 'Choisir la Langue',
    defaultTasks: {
      tahajud: 'Prière Tahajud',
      yasin: 'Sourate Yasin',
      prayers: '5 Prières',
      mulk: 'Sourate Al-Mulk',
      durood: 'Durood 1000 fois'
    }
  }
};

const getDefaultTasks = (lang = 'en') => {
  const t = translations[lang].defaultTasks;
  return [
    {
      id: Date.now() + Math.random(),
      text: t.tahajud,
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: Date.now() + Math.random() + 0.1,
      text: t.yasin,
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: Date.now() + Math.random() + 0.2,
      text: t.prayers,
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: Date.now() + Math.random() + 0.3,
      text: t.mulk,
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: Date.now() + Math.random() + 0.4,
      text: t.durood,
      completed: false,
      createdAt: new Date().toISOString()
    }
  ];
};

const themes = {
  light: {
    name: 'Light',
    bg: 'from-blue-50 to-indigo-100',
    card: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    textTertiary: 'text-gray-500',
    border: 'border-gray-200',
    input: 'bg-white border-gray-300 text-gray-900',
    taskBg: 'bg-gray-50 hover:bg-gray-100',
    completed: 'text-gray-400',
    infoBox: 'bg-green-50 text-gray-700',
    modal: 'bg-white'
  },
  dark: {
    name: 'Dark',
    bg: 'from-gray-900 to-gray-800',
    card: 'bg-gray-800',
    text: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textTertiary: 'text-gray-400',
    border: 'border-gray-700',
    input: 'bg-gray-700 border-gray-600 text-gray-100',
    taskBg: 'bg-gray-700 hover:bg-gray-600',
    completed: 'text-gray-500',
    infoBox: 'bg-gray-700 text-gray-300',
    modal: 'bg-gray-800'
  },
  ocean: {
    name: 'Ocean',
    bg: 'from-cyan-100 to-blue-200',
    card: 'bg-white',
    text: 'text-blue-900',
    textSecondary: 'text-blue-700',
    textTertiary: 'text-blue-600',
    border: 'border-blue-200',
    input: 'bg-white border-blue-300 text-blue-900',
    taskBg: 'bg-blue-50 hover:bg-blue-100',
    completed: 'text-blue-300',
    infoBox: 'bg-blue-50 text-blue-800',
    modal: 'bg-white'
  },
  forest: {
    name: 'Forest',
    bg: 'from-green-100 to-emerald-200',
    card: 'bg-white',
    text: 'text-green-900',
    textSecondary: 'text-green-700',
    textTertiary: 'text-green-600',
    border: 'border-green-200',
    input: 'bg-white border-green-300 text-green-900',
    taskBg: 'bg-green-50 hover:bg-green-100',
    completed: 'text-green-300',
    infoBox: 'bg-green-50 text-green-800',
    modal: 'bg-white'
  },
  sunset: {
    name: 'Sunset',
    bg: 'from-orange-100 to-pink-200',
    card: 'bg-white',
    text: 'text-orange-900',
    textSecondary: 'text-orange-700',
    textTertiary: 'text-orange-600',
    border: 'border-orange-200',
    input: 'bg-white border-orange-300 text-orange-900',
    taskBg: 'bg-orange-50 hover:bg-orange-100',
    completed: 'text-orange-300',
    infoBox: 'bg-orange-50 text-orange-800',
    modal: 'bg-white'
  },
  midnight: {
    name: 'Midnight',
    bg: 'from-indigo-950 to-purple-900',
    card: 'bg-indigo-900',
    text: 'text-indigo-100',
    textSecondary: 'text-indigo-300',
    textTertiary: 'text-indigo-400',
    border: 'border-indigo-700',
    input: 'bg-indigo-800 border-indigo-600 text-indigo-100',
    taskBg: 'bg-indigo-800 hover:bg-indigo-700',
    completed: 'text-indigo-500',
    infoBox: 'bg-indigo-800 text-indigo-200',
    modal: 'bg-indigo-900'
  }
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [historyDates, setHistoryDates] = useState([]);
  const [selectedHistoryDate, setSelectedHistoryDate] = useState(null);
  const [historyTasks, setHistoryTasks] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showExportModal, setShowExportModal] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const t = translations[language];

  // Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app_language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage
  const changeLanguage = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('app_language', newLang);
    setShowLanguageModal(false);
  };

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('app_theme', newTheme);
    setShowThemeModal(false);
  };

  const currentTheme = themes[theme];

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const copyTasksFromPreviousDay = (today) => {
    try {
      const yesterday = getYesterdayDate();
      const storedData = localStorage.getItem(`tasks:${yesterday}`);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.tasks && data.tasks.length > 0) {
          const copiedTasks = data.tasks.map(task => ({
            ...task,
            id: Date.now() + Math.random(),
            completed: false,
            createdAt: new Date().toISOString()
          }));
          
          return copiedTasks;
        }
      }
    } catch (error) {
      console.error('Error copying tasks from previous day:', error);
    }
    return [];
  };

  const loadTasks = () => {
    try {
      const today = getTodayDate();
      const storedData = localStorage.getItem(`tasks:${today}`);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        setTasks(data.tasks || []);
        setCurrentDate(data.date);
      } else {
        const isFirstTime = localStorage.getItem('app_initialized') === null;
        
        if (isFirstTime) {
          const defaultTasks = getDefaultTasks(language);
          localStorage.setItem(
            `tasks:${today}`,
            JSON.stringify({ tasks: defaultTasks, date: today })
          );
          localStorage.setItem('app_initialized', 'true');
          setTasks(defaultTasks);
        } else {
          const copiedTasks = copyTasksFromPreviousDay(today);
          if (copiedTasks?.length > 0) {
            localStorage.setItem(
              `tasks:${today}`,
              JSON.stringify({ tasks: copiedTasks, date: today })
            );
          }
          setTasks(copiedTasks);
        }
        setCurrentDate(today);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      const today = getTodayDate();
      const copiedTasks = copyTasksFromPreviousDay(today);
      setTasks(copiedTasks);
      setCurrentDate(today);
    }
    setLoading(false);
  };

  const loadHistoryDates = () => {
    try {
      const dates = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('tasks:')) {
          dates.push(key.replace('tasks:', ''));
        }
      }
      dates.sort((a, b) => new Date(b) - new Date(a));
      setHistoryDates(dates);
    } catch (error) {
      console.error('Error loading history:', error);
      setHistoryDates([]);
    }
  };

  const loadTasksForDate = (date) => {
    try {
      const storedData = localStorage.getItem(`tasks:${date}`);
      if (storedData) {
        const data = JSON.parse(storedData);
        setHistoryTasks(data.tasks || []);
        setSelectedHistoryDate(date);
      } else {
        setHistoryTasks([]);
        setSelectedHistoryDate(date);
      }
    } catch (error) {
      setHistoryTasks([]);
      setSelectedHistoryDate(date);
    }
  };

  const saveTasks = (tasksToSave, date) => {
    try {
      localStorage.setItem(
        `tasks:${date}`,
        JSON.stringify({ tasks: tasksToSave, date })
      );
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  useEffect(() => {
    const today = getTodayDate();
    if (currentDate && today !== currentDate) {
      loadTasks();
      return;
    }
    
    if (!currentDate) {
      loadTasks();
    }
    
    const interval = setInterval(() => {
      const today = getTodayDate();
      if (today !== currentDate) {
        loadTasks();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currentDate]);

  useEffect(() => {
    if (!loading && currentDate) {
      saveTasks(tasks, currentDate);
    }
  }, [tasks, currentDate, loading]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setShowAddModal(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { 
            ...task, 
            completed: !task.completed, 
            completedAt: !task.completed ? new Date().toISOString() : null 
          }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const formatDate = (dateString) => {
    if(!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const openHistory = () => {
    setShowHistory(true);
    setActiveTab('history');
    loadHistoryDates();
  };

  const closeHistory = () => {
    setShowHistory(false);
    setSelectedHistoryDate(null);
    setHistoryTasks([]);
    setSearchDate('');
    setActiveTab('home');
  };

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropTaskId) => {
    e.preventDefault();
    
    if (draggedTaskId === dropTaskId) return;

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const dropIndex = tasks.findIndex(t => t.id === dropTaskId);

    const newTasks = [...tasks];
    const [draggedTask] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);

    setTasks(newTasks);
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (taskId) => {
    if (editingText.trim()) {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, text: editingText.trim() } : task
      ));
    }
    setEditingTaskId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleEditKeyPress = (e, taskId) => {
    if (e.key === 'Enter') {
      saveEdit(taskId);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const exportTodayTasks = () => {
    const dataToExport = {
      date: currentDate,
      tasks: tasks,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${currentDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAllHistory = () => {
    const allData = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tasks:')) {
        const data = localStorage.getItem(key);
        if (data) {
          allData[key] = JSON.parse(data);
        }
      }
    }
    
    const dataToExport = {
      allTasks: allData,
      exportedAt: new Date().toISOString(),
      totalDays: Object.keys(allData).length
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTasks = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.allTasks) {
          Object.keys(data.allTasks).forEach(key => {
            localStorage.setItem(key, JSON.stringify(data.allTasks[key]));
          });
          alert(`${t.importSuccess} ${data.totalDays} ${t.daysHistory}`);
          loadTasks();
        } else if (data.tasks && data.date) {
          localStorage.setItem(`tasks:${data.date}`, JSON.stringify(data));
          if (data.date === currentDate) {
            setTasks(data.tasks);
          }
          alert(`${t.importSuccessDate} ${data.date}!`);
        } else {
          alert(t.invalidFile);
        }
      } catch (error) {
        alert(t.errorImporting + ' ' + error.message);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  const searchByDate = (searchDate) => {
    setSearchDate(searchDate);
    loadTasksForDate(searchDate);
  };

  const handleRefresh = () => {
    const today = getTodayDate();
    if (today !== currentDate) {
      loadTasks();
    } else {
      alert(t.alreadyToday);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${currentTheme.bg}`}>
        <div className={currentTheme.textSecondary}>Loading tasks...</div>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className={`h-screen bg-gradient-to-br ${currentTheme.bg} p-4 md:p-8 overflow-hidden transition-colors duration-300`}>
      {/* Mobile Bottom Tab Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${currentTheme.card} ${currentTheme.border} border-t shadow-lg z-50`}>
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'home' ? 'text-indigo-600' : currentTheme.textTertiary
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'add' ? 'text-indigo-600' : currentTheme.textTertiary
            }`}
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs mt-1">Add Task</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('export');
              setShowExportModal(true);
            }}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'export' ? 'text-indigo-600' : currentTheme.textTertiary
            }`}
          >
            <Download className="w-6 h-6" />
            <span className="text-xs mt-1">Export</span>
          </button>
          
          <button
            onClick={openHistory}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'history' ? 'text-indigo-600' : currentTheme.textTertiary
            }`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">History</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto h-full flex flex-col pb-20 md:pb-0">
        <div className={`${currentTheme.card} rounded-lg shadow-xl p-6 md:p-8 flex flex-col h-full transition-colors duration-300`}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className={`text-[20px] md:text-3xl font-bold ${currentTheme.text}`}>{t.dailyTasks}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLanguageModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  title="Change language"
                >
                  <Languages className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowThemeModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  title="Change theme"
                >
                  <Palette className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  title="Refresh to check new day"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={openHistory}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                >
                  <History className="w-5 h-5" />
                  {t.history}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className={`flex items-center ${currentTheme.textSecondary} text-sm`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {currentDate && formatDate(currentDate)}
                </div>
                <div className={`mt-2 text-sm ${currentTheme.textTertiary}`}>
                  {completedCount} {t.of} {tasks.length} {t.completed}
                </div>
              </div>
              
              {/* Export/Import Buttons */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={exportTodayTasks}
                  className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                  title="Export today's tasks"
                >
                  <Download className="w-4 h-4" />
                  {t.exportToday}
                </button>
                <button
                  onClick={exportAllHistory}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                  title="Export all history"
                >
                  <Download className="w-4 h-4" />
                  {t.exportAll}
                </button>
                <label className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm cursor-pointer"
                  title="Import tasks">
                  <Upload className="w-4 h-4" />
                  {t.importTasks}
                  <input
                    type="file"
                    accept=".json"
                    onChange={importTasks}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Add Task Input - Desktop */}
          <div className="hidden md:flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.enterTaskName}
              className={`flex-1 px-4 py-2 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t.add}
            </button>
          </div>

          {/* Tasks List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2"
              style={{ maxHeight: 'calc(100vh - 400px)' }}>
            {tasks.length === 0 ? (
              <div className={`text-center py-12 ${currentTheme.textTertiary}`}>
                {t.noTasksToday}
              </div>
            ) : (
              tasks.map(task => (
                <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, task.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-4 ${currentTheme.taskBg} rounded-lg transition-colors cursor-move ${
                  draggedTaskId === task.id ? 'opacity-50' : ''
                }`}
              >
                <div className={`cursor-grab active:cursor-grabbing ${currentTheme.textTertiary}`}>
                  ⋮⋮
                </div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-500 rounded cursor-pointer"
                />
                {(editingTaskId === task.id&&!task.completed) ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                    onBlur={() => saveEdit(task.id)}
                    autoFocus
                    className={`flex-1 px-2 py-1 ${currentTheme.input} rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                ) : (
                  <div className="flex-1 flex flex-col">
                    <span
                      onClick={() => startEditing(task)}
                      className={`cursor-text ${
                        task.completed
                          ? currentTheme.completed
                          : currentTheme.textSecondary
                      }`}
                    >
                      {task.text}
                    </span>
                    {task.completed && task.completedAt && (
                      <span className={`text-xs ${currentTheme.textTertiary} mt-1`}>
                        ✓ Completed at {formatTime(task.completedAt)}
                      </span>
                    )}
                  </div>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  disabled={task.completed }
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              ))
            )}
          </div>

          {/* Info */}
          <div className={`mt-6 p-4 ${currentTheme.infoBox} rounded-lg text-sm flex-shrink-0`}>
            <div className="flex items-start gap-2">
              <RefreshCw className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <div>
                <strong className="text-green-800">{t.autoRepeat}</strong> {t.autoRepeatDesc}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${currentTheme.modal} rounded-lg shadow-2xl w-full max-w-md p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${currentTheme.text}`}>{t.chooseLanguage}</h3>
              <button
                onClick={() => setShowLanguageModal(false)}
                className={currentTheme.textTertiary}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-2">
              {Object.entries(translations).map(([key, lang]) => (
                <button
                  key={key}
                  onClick={() => changeLanguage(key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    language === key 
                      ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50' 
                      : `${currentTheme.border} hover:border-blue-300`
                  }`}
                >
                  <div className={`font-medium ${currentTheme.text}`}>
                    {lang.name}
                  </div>
                  {language === key && (
                    <div className="text-blue-600 text-xs mt-1">✓ {lang.active}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Theme Selection Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${currentTheme.modal} rounded-lg shadow-2xl w-full max-w-md p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${currentTheme.text}`}>Choose Theme</h3>
              <button
                onClick={() => setShowThemeModal(false)}
                className={currentTheme.textTertiary}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(themes).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => changeTheme(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === key 
                      ? 'border-indigo-500 ring-2 ring-indigo-200' 
                      : `${currentTheme.border} hover:border-indigo-300`
                  }`}
                >
                  <div className={`w-full h-16 rounded mb-2 bg-gradient-to-br ${themeData.bg}`}></div>
                  <div className={`text-center font-medium ${currentTheme.text}`}>
                    {themeData.name}
                  </div>
                  {theme === key && (
                    <div className="text-center text-indigo-600 text-xs mt-1">✓ Active</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export/Import Modal - Mobile Only */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
          <div className={`${currentTheme.modal} rounded-lg shadow-2xl w-full max-w-md p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold ${currentTheme.text}`}>{t.exportImport}</h3>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setActiveTab('home');
                }}
                className={currentTheme.textTertiary}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  exportTodayTasks();
                  setShowExportModal(false);
                  setActiveTab('home');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                {t.exportToday}
              </button>
              
              <button
                onClick={() => {
                  exportAllHistory();
                  setShowExportModal(false);
                  setActiveTab('home');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                {t.exportAll}
              </button>
              
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
                {t.importTasks}
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    importTasks(e);
                    setShowExportModal(false);
                    setActiveTab('home');
                  }}
                  className="hidden"
                />
              </label>
              
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setActiveTab('home');
                }}
                className="w-full px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal - Mobile Only */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
          <div className={`${currentTheme.modal} rounded-lg shadow-2xl w-full max-w-md p-6`}>
            <h3 className={`text-xl font-bold ${currentTheme.text} mb-4`}>{t.addNewTask}</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.enterTaskName}
              autoFocus
              className={`w-full px-4 py-3 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTask('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={addTask}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {t.add}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`${currentTheme.modal} rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
            {/* History Header */}
            <div className={`p-6 ${currentTheme.border} border-b flex items-center justify-between`}>
              <h2 className={`text-2xl font-bold ${currentTheme.text}`}>{t.taskHistory}</h2>
              <button
                onClick={closeHistory}
                className={`${currentTheme.textTertiary} hover:opacity-70 transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div>
              {/* Date Search */}
              <div className={`p-4 ${currentTheme.border} border-b ${currentTheme.taskBg}`}>
                <h3 className={`text-sm font-semibold ${currentTheme.textSecondary} mb-3`}>{t.searchByDate}</h3>
                <div className="flex flex-row max-w-[200px] gap-2">
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => searchByDate(e.target.value)}
                    className={`w-full px-3 py-2 ${currentTheme.input} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm`}
                  />
                </div>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mt-4`}>
                  {formatDate(selectedHistoryDate)}
                </h3>
              </div>

              {/* Tasks for Selected Date */}
              <div className="flex-1 max-h-[300px] md:max-h-auto overflow-y-auto p-6">
                {selectedHistoryDate ? (
                  <>
                    {historyTasks.length === 0 ? (
                      <div className={currentTheme.textTertiary}>{t.noTasksDate}</div>
                    ) : (
                     <>
                      <div className={`mb-4 text-sm ${currentTheme.textSecondary}`}>
                        {historyTasks.filter(t => t.completed).length} {t.of} {historyTasks.length} {t.completed}
                      </div>
                      <div className="space-y-2">
                        {historyTasks.map(task => (
                          <div
                            key={task.id}
                            className={`flex items-center gap-3 p-4 ${currentTheme.taskBg} rounded-lg`}
                          >
                            <input
                              type="checkbox"
                              checked={task.completed}
                              disabled
                              className="w-5 h-5 text-blue-500 rounded"
                            />
                            <div className="flex-1 flex flex-col">
                              <span
                                className={`${
                                  task.completed
                                    ? currentTheme.completed
                                    : currentTheme.textSecondary
                                }`}
                              >
                                {task.text}
                              </span>
                              {task.completed && task.completedAt && (
                                <span className={`text-xs ${currentTheme.textTertiary} mt-1`}>
                                  ✓ {t.completedAt} {formatTime(task.completedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                    )}
                  </>
                ) : (
                  <div className={`flex items-center justify-center h-full ${currentTheme.textTertiary}`}>
                    {t.selectDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}