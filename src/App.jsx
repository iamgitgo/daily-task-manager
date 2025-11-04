import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, History, X, RefreshCw, Download, Upload, RotateCw } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'add', 'export', 'history'
  const [showExportModal, setShowExportModal] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get yesterday's date
  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  };

  // Copy tasks from previous day (reset completed status)
  const copyTasksFromPreviousDay = (today) => {
    try {
      const yesterday = getYesterdayDate();
      const storedData = localStorage.getItem(`tasks:${yesterday}`);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data.tasks && data.tasks.length > 0) {
          // Copy tasks but reset completed status and update IDs
          const copiedTasks = data.tasks.map(task => ({
            ...task,
            id: Date.now() + Math.random(),
            completed: false,
            createdAt: new Date().toISOString()
          }));
          
          // Save copied tasks for today
          localStorage.setItem(
            `tasks:${today}`,
            JSON.stringify({ tasks: copiedTasks, date: today })
          );
          
          return copiedTasks;
        }
      }
    } catch (error) {
      console.error('Error copying tasks from previous day:', error);
    }
    return [];
  };

  // Load tasks from localStorage
  const loadTasks = () => {
    try {
      const today = getTodayDate();
      const storedData = localStorage.getItem(`tasks:${today}`);
      
      if (storedData) {
        const data = JSON.parse(storedData);
        setTasks(data.tasks || []);
        setCurrentDate(data.date);
      } else {
        // No tasks for today, copy from yesterday
        const copiedTasks = copyTasksFromPreviousDay(today);
        setTasks(copiedTasks);
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

  // Load all history dates
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

  // Load tasks for a specific date
  const loadTasksForDate = (date) => {
    try {
      const storedData = localStorage.getItem(`tasks:${date}`);
      console.log('Loading tasks for date:', date, 'Found data:', storedData);
      if (storedData) {
        const data = JSON.parse(storedData);
        setHistoryTasks(data.tasks || []);
        setSelectedHistoryDate(date);
      }else {
        setHistoryTasks([]);
        setSelectedHistoryDate(date);
      }
    } catch (error) {
      setHistoryTasks([]);
      setSelectedHistoryDate(date);
    }
  };

  // Save tasks to localStorage
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

  // Check if date has changed and load appropriate tasks
  useEffect(() => {
    // Check immediately on mount if date has changed
    const today = getTodayDate();
    if (currentDate && today !== currentDate) {
      console.log('Date changed detected, reloading tasks...');
      loadTasks();
      return;
    }
    
    // Initial load if no current date
    if (!currentDate) {
      loadTasks();
    }
    
    // Check every minute if the date has changed
    const interval = setInterval(() => {
      const today = getTodayDate();
      if (today !== currentDate) {
        console.log('Date changed detected in interval, reloading tasks...');
        loadTasks();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currentDate]);

  // Save tasks whenever they change
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
      setShowAddModal(false); // Close modal after adding
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
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

  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
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

  // Drag and drop handlers
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

  // Edit task handlers
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

  // Export/Import handlers
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
    
    // Get all tasks from localStorage
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
        
        // Check if it's today's tasks or full history
        if (data.allTasks) {
          // Import full history
          Object.keys(data.allTasks).forEach(key => {
            localStorage.setItem(key, JSON.stringify(data.allTasks[key]));
          });
          alert(`Successfully imported ${data.totalDays} days of task history!`);
          loadTasks();
        } else if (data.tasks && data.date) {
          // Import today's tasks
          localStorage.setItem(`tasks:${data.date}`, JSON.stringify(data));
          if (data.date === currentDate) {
            setTasks(data.tasks);
          }
          alert(`Successfully imported tasks for ${data.date}!`);
        } else {
          alert('Invalid file format!');
        }
      } catch (error) {
        alert('Error importing file: ' + error.message);
      }
    };
    reader.readAsText(file);
    
    // Reset input so the same file can be imported again
    event.target.value = '';
  };

  // Search for tasks by date
  const searchByDate = (searchDate) => {
    setSearchDate(searchDate);
    loadTasksForDate(searchDate);
  };

  // Manual refresh to check for new day
  const handleRefresh = () => {
    const today = getTodayDate();
    console.log('Manual refresh - Current:', currentDate, 'Today:', today);
    if (today !== currentDate) {
      loadTasks();
    } else {
      alert('Already showing today\'s tasks!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 overflow-hidden">
      {/* Mobile Bottom Tab Navigation - Only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'home' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'add' ? 'text-indigo-600' : 'text-gray-500'
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
              activeTab === 'export' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <Download className="w-6 h-6" />
            <span className="text-xs mt-1">Export</span>
          </button>
          
          <button
            onClick={openHistory}
            className={`flex flex-col items-center justify-center px-4 py-2 ${
              activeTab === 'history' ? 'text-indigo-600' : 'text-gray-500'
            }`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">History</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto h-full flex flex-col pb-20 md:pb-0">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-800">Daily Tasks</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  title="Refresh to check new day"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={openHistory}
                  className=" hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                >
                  <History className="w-5 h-5" />
                  History
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {currentDate && formatDate(currentDate)}
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {completedCount} of {tasks.length} completed
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
                  Export Today
                </button>
                <button
                  onClick={exportAllHistory}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                  title="Export all history"
                >
                  <Download className="w-4 h-4" />
                  Export All
                </button>
                <label className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm cursor-pointer"
                  title="Import tasks">
                  <Upload className="w-4 h-4" />
                  Import
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
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>

         

          {/* Tasks List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2"
               style={{ maxHeight: 'calc(100vh - 400px)' }}>
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No tasks for today. Add one to get started!
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
                  className={`flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-move ${
                    draggedTaskId === task.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="cursor-grab active:cursor-grabbing text-gray-400">
                    ⋮⋮
                  </div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-500 rounded cursor-pointer"
                  />
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                      onBlur={() => saveEdit(task.id)}
                      autoFocus
                      className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span
                      onClick={() => startEditing(task)}
                      className={`flex-1 cursor-text ${
                        task.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg text-sm text-gray-700 flex-shrink-0">
            <div className="flex items-start gap-2">
              <RefreshCw className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <div>
                <strong className="text-green-800">Auto-Repeat:</strong> Your tasks automatically carry over to the next day (unchecked), so you don't need to re-add them!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export/Import Modal - Mobile Only */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Export / Import</h3>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setActiveTab('home');
                }}
                className="text-gray-500 hover:text-gray-700"
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
                Export Today's Tasks
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
                Export All History
              </button>
              
              <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
                Import Tasks
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal - Mobile Only */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter task name..."
              autoFocus
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewTask('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* History Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Task History</h2>
              <button
                onClick={closeHistory}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className=" ">
              {/* Left Section: Date Search + Date List */}
                {/* Date Search */}
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Search by Date</h3>
                  <div className="flex flex-row max-w-[200px] gap-2">
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => searchByDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {formatDate(selectedHistoryDate)}
                  </h3>
                </div>

            

              {/* Tasks for Selected Date */}
              <div className="flex-1 max-h-[400px] md:max-h-auto overflow-y-auto p-6">
                {selectedHistoryDate ? (
                  <>
                    {historyTasks.length === 0 ? (
                      <div className="text-gray-400">No tasks recorded for this date</div>
                    ) : (
                      <>
                        <div className="mb-4 text-sm text-gray-600">
                          {historyTasks.filter(t => t.completed).length} of {historyTasks.length} completed
                        </div>
                        <div className="space-y-2">
                          {historyTasks.map(task => (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                            >
                              <input
                                type="checkbox"
                                checked={task.completed}
                                disabled
                                className="w-5 h-5 text-blue-500 rounded"
                              />
                              <span
                                className={`flex-1 ${
                                  task.completed
                                    ? 'line-through text-gray-400'
                                    : 'text-gray-700'
                                }`}
                              >
                                {task.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Select a date to view tasks
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