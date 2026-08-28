import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "#d41111", background: "#fff5f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
          <h2>⚠️ Runtime Error Encountered</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fee2e2", padding: 15, borderRadius: 8 }}>
            {this.state.error && this.state.error.toString()}
            {"\n"}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: "10px 16px", cursor: "pointer" }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
