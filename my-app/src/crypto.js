/**
 * Secure local encryption utilities using Web Crypto API (AES-256-GCM)
 * All data is encrypted client-side with a user-provided master password
 * No data is ever transmitted or stored unencrypted
 */

class SecureStorage {
  constructor() {
    this.masterKey = null;
    this.isUnlocked = false;
  }

  /**
   * Derive a cryptographic key from the user's password using PBKDF2
   * @param {string} password - User's master password
   * @param {Uint8Array} salt - Salt for key derivation
   * @returns {Promise<CryptoKey>}
   */
  async deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 600000, // High iteration count for security (OWASP recommended)
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Initialize the vault with a new master password
   * @param {string} password - User's chosen master password
   * @returns {Promise<boolean>}
   */
  async initializeVault(password) {
    try {
      // Generate random salt for key derivation
      const salt = crypto.getRandomValues(new Uint8Array(32));
      
      // Store salt (not sensitive, needed for key derivation)
      localStorage.setItem('vault_salt', this.arrayBufferToBase64(salt));
      
      // Create a test encryption to verify setup
      const key = await this.deriveKey(password, salt);
      const testData = 'vault_initialized';
      const encrypted = await this.encryptWithKey(testData, key);
      
      localStorage.setItem('vault_test', encrypted);
      
      this.masterKey = key;
      this.isUnlocked = true;
      
      return true;
    } catch (error) {
      console.error('Failed to initialize vault:', error);
      return false;
    }
  }

  /**
   * Unlock the vault with the master password
   * @param {string} password - User's master password
   * @returns {Promise<boolean>}
   */
  async unlockVault(password) {
    try {
      const saltBase64 = localStorage.getItem('vault_salt');
      if (!saltBase64) {
        return false; // Vault not initialized
      }

      const salt = this.base64ToArrayBuffer(saltBase64);
      const key = await this.deriveKey(password, salt);
      
      // Verify password by decrypting test data
      const testEncrypted = localStorage.getItem('vault_test');
      if (testEncrypted) {
        const decrypted = await this.decryptWithKey(testEncrypted, key);
        if (decrypted !== 'vault_initialized') {
          return false; // Wrong password
        }
      }
      
      this.masterKey = key;
      this.isUnlocked = true;
      
      return true;
    } catch (error) {
      console.error('Failed to unlock vault:', error);
      return false;
    }
  }

  /**
   * Encrypt data with the provided key
   * @param {string} data - Data to encrypt
   * @param {CryptoKey} key - Encryption key
   * @returns {Promise<string>} - Base64 encoded encrypted data with IV
   */
  async encryptWithKey(data, key) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    // Generate random IV for each encryption
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      dataBuffer
    );
    
    // Combine IV and encrypted data
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);
    
    return this.arrayBufferToBase64(combined);
  }

  /**
   * Decrypt data with the provided key
   * @param {string} encryptedData - Base64 encoded encrypted data with IV
   * @param {CryptoKey} key - Decryption key
   * @returns {Promise<string>} - Decrypted data
   */
  async decryptWithKey(encryptedData, key) {
    const combined = this.base64ToArrayBuffer(encryptedData);
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  }

  /**
   * Encrypt and save data to localStorage
   * @param {string} key - Storage key
   * @param {any} data - Data to encrypt and store
   * @returns {Promise<boolean>}
   */
  async encryptAndSave(key, data) {
    if (!this.isUnlocked || !this.masterKey) {
      throw new Error('Vault is locked');
    }

    try {
      const jsonData = JSON.stringify(data);
      const encrypted = await this.encryptWithKey(jsonData, this.masterKey);
      localStorage.setItem('encrypted_' + key, encrypted);
      return true;
    } catch (error) {
      console.error('Failed to encrypt and save:', error);
      return false;
    }
  }

  /**
   * Load and decrypt data from localStorage
   * @param {string} key - Storage key
   * @returns {Promise<any>} - Decrypted data
   */
  async loadAndDecrypt(key) {
    if (!this.isUnlocked || !this.masterKey) {
      throw new Error('Vault is locked');
    }

    try {
      const encrypted = localStorage.getItem('encrypted_' + key);
      if (!encrypted) {
        return null;
      }

      const decrypted = await this.decryptWithKey(encrypted, this.masterKey);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to load and decrypt:', error);
      return null;
    }
  }

  /**
   * Change the master password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<boolean>}
   */
  async changePassword(oldPassword, newPassword) {
    try {
      // Verify old password
      const unlocked = await this.unlockVault(oldPassword);
      if (!unlocked) {
        return false;
      }

      // Load all encrypted data
      const userData = await this.loadAndDecrypt('userDataArray');
      
      // Re-initialize with new password
      await this.initializeVault(newPassword);
      
      // Re-encrypt data with new password
      if (userData) {
        await this.encryptAndSave('userDataArray', userData);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to change password:', error);
      return false;
    }
  }

  /**
   * Lock the vault (clear master key from memory)
   */
  lockVault() {
    this.masterKey = null;
    this.isUnlocked = false;
  }

  /**
   * Check if vault is initialized
   * @returns {boolean}
   */
  isVaultInitialized() {
    return localStorage.getItem('vault_salt') !== null;
  }

  /**
   * Securely delete all vault data
   */
  deleteVault() {
    localStorage.removeItem('vault_salt');
    localStorage.removeItem('vault_test');
    localStorage.removeItem('encrypted_userDataArray');
    this.lockVault();
  }

  // Utility functions
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
}

// Export singleton instance
const secureStorage = new SecureStorage();
