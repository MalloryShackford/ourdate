import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';
import About from './pages/profile/about';
import Contact from './pages/profile/contact';
import Dialogs from './pages/dialogs';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import Partners from './pages/profile/partners';
import Profile from './pages/profile/profile';
import FavoritesHistory from './pages/profile/FavoritesHistory';
import Settings from './pages/profile/settings';
import Showcase from './pages/showcase';
import Subscription from './pages/profile/subscription';
import Users from './pages/users';
import App from './App';
import LoginContainer from './pages/login/LoginContainer';
import SignupContainer from './pages/signup/SignupContainer';
import PasswordReset from './pages/reset/PasswordReset';
import PasswordResetConfirm from './pages/reset/PasswordResetConfirm';
import PasswordResetSuccess from './pages/reset/PasswordResetSuccess';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/dialogs" element={<Dialogs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/users" element={<Users />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/favorites-history" element={<FavoritesHistory />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/about" element={<About />} />
      <Route path="/reset-password" element={<PasswordReset />} />
      <Route path="/password_confirmation" element={<PasswordResetConfirm />} />
      <Route path="/password-success" element={<PasswordResetSuccess />} />
    </Route>
  )
);

export default router;
