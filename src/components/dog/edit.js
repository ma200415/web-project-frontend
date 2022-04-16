import { useLocation } from 'react-router-dom';

import { editDog } from '../../helpers/WebAPI'

import InputDog from './input'

export default function EditDog() {
    const location = useLocation()

    const handleSubmit = async (data) => {
        const result = await editDog(data)

        console.log("handleEditDog", result)

        return result
    };

    return (
        <InputDog mode="Edit" dog={location.state} handleSubmit={handleSubmit} />
    );
}