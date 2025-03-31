// Account database using localStorage
export interface UserAccount {
  firstName: string;
  lastName: string;
  cellPhone: string;
  countryCode?: string;
  username: string;
  password: string;
  balance?: number;
  createdAt?: number;
  lastLogin?: number;
}

export const accountsDB = {
  // Save a new user account
  saveAccount: (account: UserAccount): boolean => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return false;
      }

      // Get existing accounts from localStorage
      const existingAccountsJSON = localStorage.getItem('userAccounts') || '[]';
      const existingAccounts: UserAccount[] = JSON.parse(existingAccountsJSON);

      // Check if username already exists
      if (existingAccounts.some(user => user.username === account.username)) {
        return false; // Username already taken
      }

      // Add the new account with additional fields
      const newAccount = {
        ...account,
        balance: 0,
        createdAt: Date.now(),
        lastLogin: Date.now()
      };
      
      existingAccounts.push(newAccount);
      
      // Save back to localStorage
      localStorage.setItem('userAccounts', JSON.stringify(existingAccounts));
      
      return true;
    } catch (error) {
      console.error('Error saving account:', error);
      return false;
    }
  },

  // Check if login credentials are valid
  validateLogin: (username: string, password: string): boolean => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return false;
      }

      // Get accounts from localStorage
      const accountsJSON = localStorage.getItem('userAccounts') || '[]';
      const accounts: UserAccount[] = JSON.parse(accountsJSON);

      // Find matching username and password
      const isValid = accounts.some(
        account => account.username === username && account.password === password
      );
      
      // Update last login if credentials are valid
      if (isValid) {
        const updatedAccounts = accounts.map(account => {
          if (account.username === username) {
            return { ...account, lastLogin: Date.now() };
          }
          return account;
        });
        
        localStorage.setItem('userAccounts', JSON.stringify(updatedAccounts));
      }
      
      return isValid;
    } catch (error) {
      console.error('Error validating login:', error);
      return false;
    }
  },

  // Get user profile by username
  getUserProfile: (username: string): UserAccount | null => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return null;
      }
      
      const accountsJSON = localStorage.getItem('userAccounts') || '[]';
      const accounts: UserAccount[] = JSON.parse(accountsJSON);
      
      const userAccount = accounts.find(account => account.username === username);
      
      if (userAccount) {
        // Don't return the password to the front-end for security
        const { password, ...safeUserData } = userAccount;
        return safeUserData as UserAccount;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  },
  
  // Update user profile
  updateUserProfile: (username: string, updatedData: Partial<UserAccount>): boolean => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return false;
      }
      
      const accountsJSON = localStorage.getItem('userAccounts') || '[]';
      const accounts: UserAccount[] = JSON.parse(accountsJSON);
      
      const updatedAccounts = accounts.map(account => {
        if (account.username === username) {
          // Never update username through this method for security
          const { username: _, ...safeUpdates } = updatedData;
          return { ...account, ...safeUpdates };
        }
        return account;
      });
      
      localStorage.setItem('userAccounts', JSON.stringify(updatedAccounts));
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  },
  
  // Change password
  changePassword: (username: string, currentPassword: string, newPassword: string): boolean => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return false;
      }
      
      const accountsJSON = localStorage.getItem('userAccounts') || '[]';
      const accounts: UserAccount[] = JSON.parse(accountsJSON);
      
      let passwordChanged = false;
      
      const updatedAccounts = accounts.map(account => {
        if (account.username === username && account.password === currentPassword) {
          passwordChanged = true;
          return { ...account, password: newPassword };
        }
        return account;
      });
      
      if (passwordChanged) {
        localStorage.setItem('userAccounts', JSON.stringify(updatedAccounts));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error changing password:', error);
      return false;
    }
  },

  // Get all accounts (for admin purposes)
  getAllAccounts: (): UserAccount[] => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        return [];
      }
      
      const accountsJSON = localStorage.getItem('userAccounts') || '[]';
      const accounts: UserAccount[] = JSON.parse(accountsJSON);
      
      // Remove passwords from the accounts before returning
      return accounts.map(({ password, ...rest }) => rest as UserAccount);
    } catch (error) {
      console.error('Error getting accounts:', error);
      return [];
    }
  }
}; 