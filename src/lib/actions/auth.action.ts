"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  
  try {
    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });
    
    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    
    return { success: true };
  } catch (error: unknown) {
    console.error("Error setting session cookie:", error);
    return { success: false, message: "Failed to set session" };
  }
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  
  try {
    // Check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }
    
    // Save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date(),
      // profileURL,
      // resumeURL,
    });
    
    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    
    // Handle Firebase Admin SDK errors
    if (error instanceof Error) {
      // Check for specific Firebase error codes
      if ('code' in error) {
        const firebaseError = error as { code: string; message: string };
        
        switch (firebaseError.code) {
          case 'auth/email-already-exists':
            return {
              success: false,
              message: "This email is already in use",
            };
          case 'auth/invalid-email':
            return {
              success: false,
              message: "Invalid email address",
            };
          case 'auth/uid-already-exists':
            return {
              success: false,
              message: "User already exists",
            };
          default:
            return {
              success: false,
              message: firebaseError.message || "Failed to create account",
            };
        }
      }
    }
    
    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  
  try {
    // Verify the user exists
    const userRecord = await auth.getUserByEmail(email);
    
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };
    }
    
    // Set the session cookie
    const sessionResult = await setSessionCookie(idToken);
    
    if (!sessionResult.success) {
      return {
        success: false,
        message: "Failed to create session. Please try again.",
      };
    }
    
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    
    if (error instanceof Error && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          return {
            success: false,
            message: "User does not exist. Create an account.",
          };
        case 'auth/invalid-id-token':
          return {
            success: false,
            message: "Invalid authentication. Please try again.",
          };
        case 'auth/id-token-expired':
          return {
            success: false,
            message: "Authentication expired. Please sign in again.",
          };
        default:
          return {
            success: false,
            message: firebaseError.message || "Failed to sign in",
          };
      }
    }
    
    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    
    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    
    return {
      success: false,
      message: "Failed to sign out",
    };
  }
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    
    if (!sessionCookie) {
      return null;
    }
    
    // Verify session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
    // Get user info from database
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    
    if (!userRecord.exists) {
      return null;
    }
    
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error: unknown) {
    console.error("Error getting current user:", error);
    
    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error: unknown) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

// Additional helper function to refresh session
export async function refreshSession(idToken: string) {
  try {
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Session refreshed successfully",
    };
  } catch (error: unknown) {
    console.error("Error refreshing session:", error);
    return {
      success: false,
      message: "Failed to refresh session",
    };
  }
}