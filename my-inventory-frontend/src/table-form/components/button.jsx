import 'table-form/styles/button.scss';

export const Button = (
    {
        className = '', children, variant = 'default' || 'secondary' || 'cancel', onClick, ...props
    }) => {
    return (
        <button className={`kit-button ${variant} ${className}`} onClick={onClick}{...props}>
            {children}
        </button>
    );
};