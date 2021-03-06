import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import ClassroomEditView from './views/classroom/ClassroomEditView';
import EventTable from './views/event/EventTable';
import EventForm from './views/event/EventForm';
import RoomTable from './views/room/RoomTable';
import RoomForm from './views/room/RoomForm';

import TrainerListView from './views/trainer/TrainerListView';
import TrainerAddView from './views/trainer/TrainerAddView';
import TrainerEditView from './views/trainer/TrainerEditView';
import MemberTable from './views/member/MemberTable';
import VideoClassTable from './views/videoClass/VideoClassTable';
import VideoClassForm from './views/videoClass/VideoClassForm';
import ClassroomTable from 'src/views/classroom/ClassroomTable';
import ClassroomForm from './views/classroom/ClassroomForm';

const routes = (isLogin) => [
  {
    path: 'app',
    element: isLogin ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> }, //1
      { path: 'trainer', element: <TrainerListView /> },
      { path: 'trainer/add', element: <TrainerAddView /> },
      { path: 'trainer/edit/:id', element: <TrainerEditView /> },
      { path: 'classroom', element: <ClassroomTable /> },
      { path: 'classroom/add', element: <ClassroomForm /> },
      { path: 'classroom/edit', element: <ClassroomForm /> },
      { path: 'event', element: <EventTable /> },
      { path: 'event/add', element: <EventForm /> },
      { path: 'event/edit', element: <EventForm /> },
      { path: 'room', element: <RoomTable /> },
      { path: 'room/add', element: <RoomForm /> },
      { path: 'room/edit', element: <RoomForm /> },
      { path: 'video-class', element: <VideoClassTable /> },
      { path: 'video-class/add', element: <VideoClassForm /> },
      { path: 'video-class/edit', element: <VideoClassForm /> },
      { path: 'member', element: <MemberTable /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> }, // 2
      { path: 'settings', element: <SettingsView /> }, // 3
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
