import memberstackDOM from '@memberstack/dom';

// Initialize Memberstack with your configuration
const memberstack = memberstackDOM.init({
  domain: "https://memberstack-client.proofmodepro.com",
  publicKey: "pk_ede9ec7e19a0640c0bba",
});

// Memberstack API helpers using the modern DOM SDK
export const memberstackService = {
  // Sign up a new user
  signup: async (email: string, password: string, userData?: Record<string, unknown>) => {
    try {
      const member = await memberstack.signup({
        email,
        password,
        customFields: userData
      });
      return { success: true, member };
    } catch (error) {
      console.error('Memberstack signup error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Signup failed' };
    }
  },

  // Log in existing user
  login: async (email: string, password: string) => {
    try {
      const member = await memberstack.login({
        email,
        password
      });
      return { success: true, member };
    } catch (error) {
      console.error('Memberstack login error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  },

  // Log out current user
  logout: async () => {
    try {
      await memberstack.logout();
      return { success: true };
    } catch (error) {
      console.error('Memberstack logout error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Logout failed' };
    }
  },

  // Get current member
  getCurrentMember: async () => {
    try {
      const member = await memberstack.getCurrentMember();
      return member;
    } catch (error) {
      console.error('Get current member error:', error);
      return null;
    }
  },

  // Update member profile
  updateMember: async (updates: Record<string, unknown>) => {
    try {
      const member = await memberstack.updateMember(updates);
      return { success: true, member };
    } catch (error) {
      console.error('Update member error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Update failed' };
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const member = await memberstack.getCurrentMember();
      return !!member;
    } catch (error) {
      return false;
    }
  }
};

// Export the initialized memberstack instance and service
export { memberstack };
export default memberstackService;