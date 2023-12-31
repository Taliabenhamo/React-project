import { useState } from "react";
import FormLayout from "../layouts/FormLayout";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/ApiServices";

function SignUp() {
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
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();

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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
      toast.error('Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and one of the following special characters: !@#$%^&*');
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
  }
  function clearFields() {
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setState('');
    setCountry('');
    setEmail('');
    setPhone('');
    setPassword('');
    setImageUrl('');
    setImageAlt('');
    setCity('');
    setStreet('');
    setHouseNum('');
    setZip('');
  }

  function handleClick() {
    if (!validate()) {
      return;
    }

    signup({
      firstName,
      lastName,
      middleName,
      phone,
      email,
      password,
      imageUrl,
      imageAlt,
      state,
      country,
      city,
      street,
      houseNum,
      zip,
      isAdmin,
      cards: []
    })
      .then((user) => {
        navigate('/login');
        toast.success('User registered Successfully');
      })
      .catch((err) => {
        toast.error('Registeration failed: ' + err.message);
      });
  }


  return (
    <>
      <Title mainText="REGISTER" />

      <FormLayout>
        <form>
          <div className='m-4'>
            <div className='d-flex m-4'>
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

            <div className='d-flex m-4'>
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
                  placeholder='Phone'
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
            <div className='d-flex m-4 '>
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
                  placeholder='Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <label htmlFor='floatingInput'>Country:&#42;</label>
              </div>
            </div>
            <div className='d-flex m-4'>
              <div className='form-floating left-input m-2'>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  placeholder='City'
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
            <div className='d-flex m-4 '>
              <div className='form-floating left-input m-2'>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  placeholder='HouseNum'
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
                  placeholder='Zip'
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
                <label htmlFor='floatingInput'>Zip: &#42;</label>
              </div>


            </div>
            <div className='d-flex m-4'>
              <div className='form-floating left-input m-2'>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='floatingInput'>
                  Email: &#42;
                </label>
              </div>

              <div className='form-floating right-input m-2'>
                <input
                  type='text'
                  className='form-control'
                  id='floatingInput'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor='floatingInput'>Password:&#42;</label>
              </div>


            </div>
          </div>
        </form>


      </FormLayout>

      <div className="m-4 d-flex justify-content-center">
        <button onClick={() => (window.location.href = "/login")} className="me-2 col-2 btn btn-outline-danger">cancel</button>
        <button onClick={clearFields} className="me-2 col-2 btn btn-outline-primary">

          <i className="bi bi-arrow-repeat"></i>
        </button>
      </div>
      <div className="d-flex justify-content-center ">
        <button onClick={handleClick} className="col-4 btn btn-primary">submit</button>
      </div>

    </>
  );
}

export default SignUp;
