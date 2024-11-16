import React from 'react';
import Select from 'react-select';

// Example options with colors
const serviceOptions = [
    {value: 'Sidewalk Shed', label: 'Sidewalk Shed', color: '#67AA3C'},
    {value: 'Scaffold', label: 'Scaffold', color: '#EFD652'},
    {value: 'Shoring', label: 'Shoring', color: '#9640BE'},
];

const statusOptions = [
    {value: 'Completed', label: 'Completed', color: '#7AC14D'},
    {value: 'In Progress', label: 'In Progress', color: '#B3D99B'},
    {value: 'On Hold', label: 'On Hold', color: '#ECDE7C'},
];

// Custom styles to match the given designs
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? state.data.color : 'white',
        color: state.isSelected ? 'white' : state.data.color,
        ':hover': {
            backgroundColor: state.data.color,
            color: 'white',
        },
    }),
    control: provided => ({
        ...provided,
        borderRadius: '5px',
        backgroundColor: '#F5F5F7',
        border: 'none',
    }),
    menu: provided => ({
        ...provided,
        borderRadius: '5px',
        marginTop: '0',
        zIndex: 2, // Ensure it appears above other elements
    }),
    menuList: provided => ({
        ...provided,
        padding: 0,
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color,
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        color: 'white',
        ':hover': {
            backgroundColor: 'red',
            color: 'white',
        },
    }),
};

export const CustomDropdown = ({optionsType, isMulti, isDisabled, ...props}) => {
    const options = optionsType === 'category' ? serviceOptions : statusOptions;
    return (
        <Select
            {...props}
            options={options}
            isMulti={isMulti}
            styles={customStyles}
            isDisabled={isDisabled}
            placeholder='Select...'
            components={{
                IndicatorSeparator: () => null,
            }}
        />
    );
};