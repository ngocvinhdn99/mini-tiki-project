import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup.object().shape({
        title: yup.string().required('Please enter title').min(5, 'Title is too short'),
    })
    const form = useForm({
        defaultValues: {
            title: ''
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = (values) => {
        const {onSubmit} = props
        if (onSubmit) {
            onSubmit(values)
        }
    }
    return (
        <div>
            
        </div>
    );
}

export default RegisterForm;