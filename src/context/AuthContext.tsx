import { AuthError, Session, User } from "@supabase/supabase-js";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { supabase } from "../utils/supabase";
import * as AuthSession from "expo-auth-session";
import {
  openAuthSessionAsync,
  WebBrowserPresentationStyle,
  type WebBrowserAuthSessionResult,
} from "expo-web-browser";
import queryString from "query-string";
import { Alert } from "react-native";
export type AuthContextProps = {
  session: Session | null;
  signInWithWorkOS(): Promise<void>;
  signOut(): Promise<{
    error: AuthError | null;
  }>;
};

export interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

AuthContext.displayName = "AuthContext";

function useProtectedRoute(user?: User) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = React.useState<Session | null>(null);

  useProtectedRoute(session?.user);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signInWithWorkOS() {
    const redirect = AuthSession.makeRedirectUri({
      path: "/auth/callback",
    }).toString();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "workos",
      options: {
        redirectTo: redirect,
        queryParams: {
          organization: "workos_org_id",
        },
      },
    });

    if (data?.url) {
      const { url, error } = (await openAuthSessionAsync(data?.url, redirect, {
        preferEphemeralSession: true,
        presentationStyle: WebBrowserPresentationStyle.POPOVER,
      })) as WebBrowserAuthSessionResult & {
        url: string | null;
        error: string | null;
      };

      if (url) {
        const [, queryParams] = url.split("#");
        const parsed = queryString.parse(queryParams || "");
        await supabase.auth.setSession({
          access_token: parsed.access_token as string,
          refresh_token: parsed.refresh_token as string,
        });
      }
      if (error)
        Alert.alert(typeof error === "string" ? error : JSON.stringify(error));
    }

    if (error) Alert.alert(error.message);
  }

  async function signOut() {
    return supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{ session, signInWithWorkOS, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
