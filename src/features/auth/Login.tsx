import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ANCIEN (Context API)
// import { useAuth } from "./AuthContext";

import api from "../../api/axios";
import styles from "./Login.module.css";

// NOUVEAU (Redux Toolkit)
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // ANCIEN
  // const { state, dispatch } = useAuth();

  // NOUVEAU
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = (location.state as any)?.from || "/dashboard";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ANCIEN
    // dispatch({ type: "LOGIN_START" });

    // NOUVEAU
    dispatch(loginStart());

    try {
      const { data: users } = await api.get(`/users?email=${email}`);

      if (users.length === 0 || users[0].password !== password) {
        // ANCIEN
        // dispatch({ type: "LOGIN_FAILURE", payload: "..." });

        // NOUVEAU
        dispatch(loginFailure("Email ou mot de passe incorrect"));
        return;
      }

      const { password: _, ...userData } = users[0];

      const fakeToken = btoa(
        JSON.stringify({
          userId: userData.id,
          email: userData.email,
          role: "admin",
          exp: Date.now() + 3600000,
        })
      );

      // ANCIEN
      // dispatch({ type: "LOGIN_SUCCESS", payload: { ...userData, token: fakeToken } });

      // ANCIEN BUG
      // dispatch({ type: "LOGIN_SUCCESS", payload: userData });

      // NOUVEAU
      dispatch(loginSuccess({ user: userData, token: fakeToken }));

    } catch {
      // ANCIEN
      // dispatch({ type: "LOGIN_FAILURE", payload: "Erreur serveur" });

      // NOUVEAU
      dispatch(loginFailure("Erreur serveur"));
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>TaskFlow</h1>

        {error && <div className={styles.error}>{error}</div>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />

        <button disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}