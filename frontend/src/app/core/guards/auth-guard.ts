import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // Check for required role if specified in route data
  const requiredRole = route.data?.['role'] as string | undefined;

  if (requiredRole && authService.userRole() !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    const userRole = authService.userRole();
    switch (userRole) {
      case 'admin':
        router.navigate(['/admin']);
        break;
      case 'staff':
        router.navigate(['/staff']);
        break;
      default:
        router.navigate(['/guest']);
    }
    return false;
  }

  return true;
};

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const userRole = authService.userRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
};
