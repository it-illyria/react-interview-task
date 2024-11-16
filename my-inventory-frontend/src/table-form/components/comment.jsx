import React from 'react';
import 'table-form/styles/comment.scss';

export const Textarea = ({className = '', ...props}) => {
    return <textarea className={`kit-textarea ${className}`} {...props} />;
};