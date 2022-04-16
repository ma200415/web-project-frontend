import { addDog } from '../../helpers/WebAPI'

import InputDog from './input'

export default function AddDog() {
    const handleSubmit = async (data) => {
        return await addDog(data)
    };

    return (
        <InputDog mode="Add" handleSubmit={handleSubmit} />
    );
}