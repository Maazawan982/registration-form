package com.auracloud.auth;

import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Enterprise Authentication Service & Controller in pure Java.
 * Handles Login, Registration (Sign Up), and Password Recovery (Forgot Password).
 */
public class AuthService implements Serializable {

    private static final long serialVersionUID = 1L;

    // In-memory user database: email -> UserEntity
    private final Map<String, UserEntity> userDatabase = Collections.synchronizedMap(new HashMap<>());
    
    // In-memory OTP store: email -> ResetToken
    private final Map<String, ResetToken> resetTokenStore = Collections.synchronizedMap(new HashMap<>());

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private final SecureRandom secureRandom = new SecureRandom();

    public AuthService() {
        // Seed default demo user credentials
        registerUser("demo@auracloud.io", "DemoUser2026!#", "Demo User");
    }

    /**
     * User registration / Sign Up
     */
    public AuthResponse registerUser(String email, String rawPassword, String fullName) {
        if (email == null || !EMAIL_PATTERN.matcher(email.trim()).matches()) {
            return new AuthResponse(false, "Invalid email address format.", null);
        }
        if (rawPassword == null || rawPassword.length() < 8) {
            return new AuthResponse(false, "Password must be at least 8 characters long.", null);
        }
        if (fullName == null || fullName.trim().isEmpty()) {
            return new AuthResponse(false, "Full name cannot be blank.", null);
        }

        String normalizedEmail = email.trim().toLowerCase();
        if (userDatabase.containsKey(normalizedEmail)) {
            return new AuthResponse(false, "An account with this email already exists.", null);
        }

        String salt = generateSalt();
        String hashedPassword = hashPassword(rawPassword, salt);
        UserEntity user = new UserEntity(normalizedEmail, hashedPassword, salt, fullName.trim(), LocalDateTime.now());
        userDatabase.put(normalizedEmail, user);

        return new AuthResponse(true, "Account created successfully.", user);
    }

    /**
     * User authentication / Sign In
     */
    public AuthResponse authenticate(String email, String rawPassword) {
        if (email == null || rawPassword == null) {
            return new AuthResponse(false, "Email and password are required.", null);
        }

        String normalizedEmail = email.trim().toLowerCase();
        UserEntity user = userDatabase.get(normalizedEmail);
        if (user == null) {
            return new AuthResponse(false, "Invalid email or password.", null);
        }

        String checkHash = hashPassword(rawPassword, user.getSalt());
        if (!checkHash.equals(user.getHashedPassword())) {
            return new AuthResponse(false, "Invalid email or password.", null);
        }

        user.setLastLogin(LocalDateTime.now());
        return new AuthResponse(true, "Authentication successful.", user);
    }

    /**
     * Step 1 of Forgot Password: Generate & send 6-digit OTP
     */
    public AuthResponse requestPasswordReset(String email) {
        if (email == null || !EMAIL_PATTERN.matcher(email.trim()).matches()) {
            return new AuthResponse(false, "Please provide a valid email.", null);
        }

        String normalizedEmail = email.trim().toLowerCase();
        // Generate secure 6-digit OTP
        int code = 100000 + secureRandom.nextInt(900000);
        String otp = String.valueOf(code);
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(15);

        resetTokenStore.put(normalizedEmail, new ResetToken(otp, expiry));
        return new AuthResponse(true, "Recovery code generated and dispatched.", otp);
    }

    /**
     * Step 2 of Forgot Password: Verify 6-digit OTP
     */
    public AuthResponse verifyResetCode(String email, String inputCode) {
        if (email == null || inputCode == null) {
            return new AuthResponse(false, "Email and recovery code are required.", null);
        }

        String normalizedEmail = email.trim().toLowerCase();
        ResetToken token = resetTokenStore.get(normalizedEmail);
        if (token == null) {
            return new AuthResponse(false, "No active password reset request found.", null);
        }
        if (LocalDateTime.now().isAfter(token.getExpiryTime())) {
            resetTokenStore.remove(normalizedEmail);
            return new AuthResponse(false, "Recovery code has expired. Request a new one.", null);
        }
        if (!token.getCode().equals(inputCode.trim())) {
            return new AuthResponse(false, "Invalid recovery code.", null);
        }

        return new AuthResponse(true, "Recovery code verified.", null);
    }

    /**
     * Step 3 of Forgot Password: Set new password
     */
    public AuthResponse completePasswordReset(String email, String inputCode, String newPassword) {
        AuthResponse verification = verifyResetCode(email, inputCode);
        if (!verification.isSuccess()) {
            return verification;
        }

        if (newPassword == null || newPassword.length() < 8) {
            return new AuthResponse(false, "New password must be at least 8 characters.", null);
        }

        String normalizedEmail = email.trim().toLowerCase();
        UserEntity user = userDatabase.get(normalizedEmail);
        if (user == null) {
            // If user did not exist previously, create for demo seamlessness
            registerUser(normalizedEmail, newPassword, "Recovered User");
            resetTokenStore.remove(normalizedEmail);
            return new AuthResponse(true, "Password has been successfully updated.", null);
        }

        String newSalt = generateSalt();
        String newHash = hashPassword(newPassword, newSalt);
        user.setSalt(newSalt);
        user.setHashedPassword(newHash);
        resetTokenStore.remove(normalizedEmail);

        return new AuthResponse(true, "Password has been successfully updated.", user);
    }

    // --- Helper Utilities ---

    private String generateSalt() {
        byte[] saltBytes = new byte[16];
        secureRandom.nextBytes(saltBytes);
        return Base64.getEncoder().encodeToString(saltBytes);
    }

    private String hashPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(Base64.getDecoder().decode(salt));
            byte[] hashed = md.digest(password.getBytes());
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm missing", e);
        }
    }

    // --- Inner Models ---

    public static class UserEntity implements Serializable {
        private final String email;
        private String hashedPassword;
        private String salt;
        private final String fullName;
        private final LocalDateTime createdAt;
        private LocalDateTime lastLogin;

        public UserEntity(String email, String hashedPassword, String salt, String fullName, LocalDateTime createdAt) {
            this.email = email;
            this.hashedPassword = hashedPassword;
            this.salt = salt;
            this.fullName = fullName;
            this.createdAt = createdAt;
            this.lastLogin = createdAt;
        }

        public String getEmail() { return email; }
        public String getHashedPassword() { return hashedPassword; }
        public void setHashedPassword(String hp) { this.hashedPassword = hp; }
        public String getSalt() { return salt; }
        public void setSalt(String salt) { this.salt = salt; }
        public String getFullName() { return fullName; }
        public LocalDateTime getLastLogin() { return lastLogin; }
        public void setLastLogin(LocalDateTime l) { this.lastLogin = l; }
    }

    public static class ResetToken implements Serializable {
        private final String code;
        private final LocalDateTime expiryTime;

        public ResetToken(String code, LocalDateTime expiryTime) {
            this.code = code;
            this.expiryTime = expiryTime;
        }

        public String getCode() { return code; }
        public LocalDateTime getExpiryTime() { return expiryTime; }
    }

    public static class AuthResponse implements Serializable {
        private final boolean success;
        private final String message;
        private final Object data;

        public AuthResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public Object getData() { return data; }
    }
}
