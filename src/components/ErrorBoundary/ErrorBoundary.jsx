import React from 'react';
import { AiOutlineReload, AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    // TODO: Send error to logging service in production
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ onReset }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    onReset();
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-boundary">
      <div className="error-container">
        <div className="error-icon">
          <span>⚠️</span>
        </div>
        
        <h1 className="error-title">Oops! Something went wrong</h1>
        
        <p className="error-message">
          We're sorry, but something unexpected happened. Please try again or go back to the home page.
        </p>
        
        <div className="error-actions">
          <button 
            className="btn btn-primary"
            onClick={handleReload}
          >
            <AiOutlineReload size={18} />
            Reload Page
          </button>
          
          <button 
            className="btn btn-outline"
            onClick={handleGoHome}
          >
            <AiOutlineHome size={18} />
            Go Home
          </button>
        </div>
        
        <div className="error-help">
          <p>If the problem persists, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary; 