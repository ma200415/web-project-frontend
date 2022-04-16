import { useLocation } from 'react-router-dom';

import { editDog } from '../../helpers/WebAPI'

import InputDog from './input'

export default function EditDog() {
    const handleSubmit = async (data) => {
        return await editDog(data)
    };

    const location = useLocation()

    return (
        <InputDog mode="Edit" dog={location.state} handleSubmit={handleSubmit} />
    );
}