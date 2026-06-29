import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${
    disabled ? 'btn-disabled' : ''
  } ${className}`;

  return (
    <button className={baseClass} disabled={disabled || loading} {...props}>
      <span className="btn-content">
        {loading ? (
          <>
            <span className="spinner"></span>
            Loading...
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
          </>
        )}
      </span>
    </button>
  );
};

export default Button;