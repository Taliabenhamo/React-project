
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Title from '../components/Title';
import FormLayout from '../layouts/FormLayout';
import { editUser, getUserById } from '../../src/services/ApiServices';
import { toast } from 'react-toastify';





function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNum, setHouseNum] = useState("");
    const [zip, setZip] = useState("");
    // const [def,setDef]=useState<User|undefined>()
    useEffect(() => {
        if (!id) return;
        getUserById(id).then((json) => {

            setFirstName(json.firstName as string);
            setLastName(json.lastName as string);
            setMiddleName(json.middleName as string);
            setPhone(json.phone as string);
            setEmail(json.email as string);
            setImageUrl(json.imageUrl as string);
            setImageAlt(json.imageAlt as string);
            setState(json.state as string);
            setCountry(json.country as string);
            setCity(json.city as string);
            setStreet(json.street as string);
            setHouseNum(json.houseNum as string);
            setZip(json.zip as string);
        }
        )
    }
        , [id]);

    function validate(): boolean {


        if (!firstName || firstName.length < 3) {
            toast.error("first name is required and at least then 3 characters.");
            return false;
        }
        if (!lastName) {
            toast.error("last name is required.");
            return false;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phone || !phoneRegex.test(phone)) {
            toast.error('Phone is required and must be a valid 10-digit number.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toast.error("Email is required and must be valid.");
            return false;
        }


        if (!country) {
            toast.error("country is required.");

            return false;
        }
        if (!city) {
            toast.error("city is required.");
            return false;
        }
        if (!street) {
            toast.error("street is required.");
            return false;
        }
        if (!houseNum) {
            toast.error("house number is required.");
            return false;

        }

        return true
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!id) return;

        editUser({
            _id: id,
            firstName,
            middleName,
            lastName,
            phone,
            email,
            imageUrl,
            imageAlt,
            state,
            country,
            city,
            street,
            houseNum,
            zip


        })
            .then((json) => {
                navigate('/');
                toast.success('User edited successfully.');
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <>
            <Title mainText='Edit user' />
            <FormLayout>
                <form>
                    <div className=''>
                        <div className='d-flex m-4  '>
                            <div className='form-floating left-input m-2 '>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='City'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>
                                    First Name: &#42;
                                </label>
                            </div>

                            <div className='form-floating right-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Street'
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>Middle Name:</label>
                            </div>
                        </div>

                        <div className='d-flex  m-4'>
                            <div className='form-floating left-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>
                                    Last Name: &#42;
                                </label>
                            </div>

                            <div className='form-floating right-input m-2' >
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Street'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>Phone:&#42;</label>
                            </div>
                        </div>

                        <div className='d-flex m-4 '>
                            <div className='form-floating left-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Image Url'
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>
                                    Image Url:
                                </label>
                            </div>

                            <div className='form-floating right-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Image Alt'
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>Image Alt:</label>
                            </div>
                        </div>
                        <div className='d-flex  m-4'>
                            <div className='form-floating left-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='State'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>State: </label>
                            </div>

                            <div className='form-floating right-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='State'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>Country:&#42;</label>
                            </div>
                        </div>
                        <div className='d-flex m-4 '>
                            <div className='form-floating left-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Country'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>City: &#42;</label>
                            </div>

                            <div className='form-floating right-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Street'
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>Street:&#42;</label>
                            </div>
                        </div>
                        <div className='d-flex  m-4'>
                            <div className='form-floating left-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='City'
                                    value={houseNum}
                                    onChange={(e) => setHouseNum(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>
                                    House Number: &#42;
                                </label>
                            </div>

                            <div className='form-floating right-input m-2'>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='floatingInput'
                                    placeholder='Street'
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                />
                                <label htmlFor='floatingInput'>Zip:&#42;</label>
                            </div>


                        </div>
                        <div className='form-floating left-input'>
                            <input
                                type='text'
                                className='form-control col-4'
                                id='floatingInput'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>
                                Email: &#42;
                            </label>
                        </div>
                    </div>


                    <button
                        onClick={handleSubmit}
                        className='w-100 mb-2 btn btn-lg btn-primary border rounded-3 modal-submit-btn mt-4'

                    >
                        Edit
                    </button>
                </form>
            </FormLayout>
        </>
    );
};
export default EditUser;