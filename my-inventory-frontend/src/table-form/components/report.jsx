import 'table-form/styles/report.scss';

export const StatusCard = ({className = '', children, variant = 'completed' || 'on-road' || 'on-hold'}) => {
    return (
        <div className={`status-card ${variant} ${className}`}>{children}</div>
    );
};