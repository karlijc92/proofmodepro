// Memberstack configuration and utilities
export const MEMBERSTACK_CONFIG = {
  publicKey: 'pk_sb_cmgb1v02d00bg0sss9fvt1nkb',
  appId: 'app_cmgb1v02d00bg0sss9fvt1nkb'
};

// Initialize Memberstack
export const initMemberstack = () => {
  if (typeof window !== 'undefined') {
    // Load Memberstack script
    const script = document.createElement('script');
    script.src = 'https://api.memberstack.com/static/memberstack.js';
    script.setAttribute('data-memberstack-id', MEMBERSTACK_CONFIG.publicKey);
    document.head.appendChild(script);

    // Wait for Memberstack to load
    script.onload = () => {
      if (window.MemberStack) {
        window.MemberStack.onReady.then(() => {
          console.log('Memberstack initialized successfully');
        });
      }
    };
  }
};

// Memberstack API helpers
export const memberstack = {
  // Sign up a new user
  signup: async (email: string, password: string, userData: any) => {
    try {
      if (!window.MemberStack) {
        throw new Error('Memberstack not initialized');
      }

      const member = await window.MemberStack.signup({
        email,
        password,
        customFields: userData
      });

      return { success: true, member };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  },

  // Log in existing user
  login: async (email: string, password: string) => {
    try {
      if (!window.MemberStack) {
        throw new Error('Memberstack not initialized');
      }

      const member = await window.MemberStack.login({
        email,
        password
      });

      return { success: true, member };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // Log out current user
  logout: async () => {
    try {
      if (!window.MemberStack) {
        throw new Error('Memberstack not initialized');
      }

      await window.MemberStack.logout();
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current member
  getCurrentMember: async () => {
    try {
      if (!window.MemberStack) {
        return null;
      }

      const member = await window.MemberStack.getCurrentMember();
      return member;
    } catch (error) {
      console.error('Get current member error:', error);
      return null;
    }
  },

  // Update member profile
  updateMember: async (updates: any) => {
    try {
      if (!window.MemberStack) {
        throw new Error('Memberstack not initialized');
      }

      const member = await window.MemberStack.updateMember(updates);
      return { success: true, member };
    } catch (error) {
      console.error('Update member error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Declare global Memberstack types
declare global {
  interface Window {
    MemberStack: any;
  }
}