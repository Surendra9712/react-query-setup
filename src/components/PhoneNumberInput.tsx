import {useState} from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

const PhoneNumberInput = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (value:any)=>{
        if(value && !isValidPhoneNumber(value)){
            setErrorMessage('Invalid phone number');
        }else {
            setErrorMessage('');
        }
    }

    return (
        <div>
            <PhoneInput
                defaultCountry={'NP'}
                placeholder="Enter phone number"
                onChange={handleChange}
            />
            {errorMessage && <p>{errorMessage}</p>}
        </div>

    );
};

export default PhoneNumberInput;

