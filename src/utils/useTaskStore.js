// src/store/useTaskStore.js
import { create } from 'zustand';

export const useTaskStore = create((set, get) => ({
  allTasks: JSON.parse(localStorage.getItem('tasks')) || [],
  searchQuery: '',
  activeFilter: '',
  filterPanelOpen: false,

  // Actions
  setAllTasks: (tasks) => set({ allTasks: tasks }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  toggleFilterPanel: () => set({ filterPanelOpen: !get().filterPanelOpen }),
  closeFilterPanel: () => set({ filterPanelOpen: false }),

  getFilteredTasks: () => {
    const { allTasks, searchQuery, activeFilter } = get();
    let filtered = [...allTasks];

    if (searchQuery) {
      filtered = filtered.filter((t) =>
        t.taskTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (activeFilter) {
      case 'completed':
        filtered = filtered.filter((t) => t.isCompleted);
        break;
      case 'incomplete':
        filtered = filtered.filter((t) => !t.isCompleted);
        break;
      case 'starred':
        filtered = filtered.filter((t) => t.isStarred);
        break;
      case 'unstarred':
        filtered = filtered.filter((t) => !t.isStarred);
        break;
      case 'dueThisWeek': {
        const today = new Date();
        const weekEnd = new Date();
        weekEnd.setDate(today.getDate() + (7 - today.getDay()));
        filtered = filtered.filter((t) => {
          const dueDate = new Date(t.dueDate);
          return dueDate >= today && dueDate <= weekEnd;
        });
        break;
      }
      case 'assignedBy': {
        const user = JSON.parse(localStorage.getItem('collabUser'))?.username;
        filtered = filtered.filter((t) => t.assignedBy === user);
        break;
      }
      default:
        break;
    }

    return filtered;
  },
}));
