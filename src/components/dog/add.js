import { addDog } from '../../helpers/WebAPI'

import InputDog from './input'

export default function AddDog() {
    const handleSubmit = async (data) => {
        const result = await addDog(data)

        console.log("handleAddDog", result)

        return result
    };

    return (
        <InputDog mode="Add" dog={null} handleSubmit={handleSubmit} />
    );
}