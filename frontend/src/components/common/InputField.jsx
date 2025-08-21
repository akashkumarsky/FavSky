import React from 'react';

const InputField = ({ id, label, type = 'text', placeholder, value, onChange, name, className = '', disabled = false, required = false }) => {
    const baseStyles = 'w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500';

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className={`${baseStyles} ${className}`}
                disabled={disabled}
                required={required}
            />
        </div>
    );
};

export default InputField;
