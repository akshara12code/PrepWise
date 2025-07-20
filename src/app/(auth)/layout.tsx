import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  // ✅ FIXED: Remove ALL authentication checks from auth layout
  // This layout is for sign-in/sign-up pages, so don't check auth here
  return (
    <div className="auth-layout">
      {children}
    </div>
  );
}

export default AuthLayout;

