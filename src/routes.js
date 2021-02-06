import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import Classroom from 'src/views/classroom/ClassroomListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ClassroomAddView from './views/classroom/ClassroomAddView';
import ClassroomEditView from './views/classroom/ClassroomEditView';
import EventListView from './views/event/EventListView';
import EventAddView from './views/event/EventAddView';
import EventEditView from './views/event/EventEditView';
import RoomListView from './views/room/RoomListView';
import RoomAddView from './views/room/RoomAddView';
import RoomEditView from './views/room/RoomEditView';
import TrainerListView from './views/trainer/TrainerListView';
import TrainerAddView from './views/trainer/TrainerAddView';
import TrainerEditView from './views/trainer/TrainerEditView';
import AdminListView from './views/admin/AdminListView';
import AdminAddView from './views/admin/AdminAddView';
import AdminEditView from './views/admin/AdminEditView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'trainer', element: <TrainerListView /> },
      { path: 'trainer/add', element: <TrainerAddView /> },
      { path: 'trainer/edit', element: <TrainerEditView /> },
      { path: 'classroom', element: <Classroom /> },
      { path: 'classroom/add', element: <ClassroomAddView /> },
      { path: 'classroom/edit', element: <ClassroomEditView /> },
      { path: 'event', element: <EventListView /> },
      { path: 'event/add', element: <EventAddView /> },
      { path: 'event/edit', element: <EventEditView /> },
      { path: 'room', element: <RoomListView /> },
      { path: 'room/add', element: <RoomAddView /> },
      { path: 'room/edit', element: <RoomEditView /> },
      { path: 'admin', element: <AdminListView /> },
      { path: 'admin/add', element: <AdminAddView /> },
      { path: 'admin/edit', element: <AdminEditView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
