import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Services } from './features/public/services/services';
import { Rooms } from './features/public/rooms/rooms';
import { Booking } from './features/public/booking/booking';
import { Gallery } from './features/public/gallery/gallery';
import { Offers } from './features/public/offers/offers';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { GuestLayout } from './features/guest/layout/guest-layout/guest-layout';
import { GuestDashboard } from './features/guest/dashboard/guest-dashboard/guest-dashboard';
import { BookingHistory } from './features/guest/booking-history/booking-history/booking-history';
import { Profile } from './features/guest/profile/profile/profile';
import { StaffLayout } from './features/staff/layout/staff-layout';
import { StaffDashboard } from './features/staff/dashboard/staff-dashboard';
import { GuestManagement } from './features/staff/guest-management/guest-management';
import { StaffProfile } from './features/staff/profile/staff-profile';
import { AdminLayout } from './features/admin/layout/admin-layout';
import { AdminDashboard } from './features/admin/dashboard/admin-dashboard';
import { StaffManagement } from './features/admin/staff-management/staff-management';
import { AdminGuestManagement } from './features/admin/guest-management/admin-guest-management';
import { SystemSettings } from './features/admin/settings/system-settings';
import { roleGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'services', component: Services },
    { path: 'rooms', component: Rooms },
    { path: 'booking', component: Booking },
    { path: 'gallery', component: Gallery },
    { path: 'offers', component: Offers },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) },
    { path: 'reset-password/:token', loadComponent: () => import('./features/auth/reset-password/reset-password').then(m => m.ResetPassword) },
    {
        path: 'guest',
        component: GuestLayout,
        canActivate: [roleGuard(['guest', 'admin'])],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: GuestDashboard },
            { path: 'bookings', component: BookingHistory },
            { path: 'profile', component: Profile }
        ]
    },
    {
        path: 'staff',
        component: StaffLayout,
        canActivate: [roleGuard(['staff', 'admin'])],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: StaffDashboard },
            { path: 'guests', component: GuestManagement },
            { path: 'profile', component: StaffProfile }
        ]
    },
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [roleGuard(['admin'])],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboard },
            { path: 'staff', component: StaffManagement },
            { path: 'guests', component: AdminGuestManagement },
            { path: 'settings', component: SystemSettings }
        ]
    },
    { path: '**', redirectTo: '' }
];
