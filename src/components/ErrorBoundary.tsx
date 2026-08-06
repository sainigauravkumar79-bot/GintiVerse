import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches any render-time error in the app and shows it on screen instead of
 * a silent blank/white page. Without this, an uncaught error anywhere below
 * unmounts the whole React tree with nothing visible to the user.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("GintiVerse crashed:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "monospace", whiteSpace: "pre-wrap", color: "#b91c1c" }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            Something broke on this page
          </h1>
          <p style={{ marginBottom: 8 }}>{this.state.error.message}</p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>{this.state.error.stack}</p>
          <button
            onClick={() => (window.location.href = "/")}
            style={{ marginTop: 16, padding: "8px 16px", background: "#111", color: "#fff", borderRadius: 8 }}
          >
            Go home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
