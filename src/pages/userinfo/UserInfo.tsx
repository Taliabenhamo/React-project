import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../services/ApiServices";
import { User } from "../../interface/User";
import Title from "../../components/Title";
import "../cardInfo/Cardinfo.css"

const UserInfo = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!id) return;
        getUserById(id).then((json) => {
            setUser(json);
        });
    }, []);
    return (

        <div className='card-details'>
            <Title mainText='My User Details' />
            <div className='container '>
                <div className='row info'>
                    <div className='col-md-6'>
                        <div className='detail-item'>
                            <p>My Name is :{user?.firstName} {user?.lastName}</p>

                        </div>
                        <div className='detail-item'>
                            <p>Email:{user?.email}</p>
                        </div>
                        <div className='detail-item'>
                            <p>
                                Address: {user?.street} {user?.houseNum} , {user?.city}
                            </p>
                        </div>
                        <div className='detail-item'>
                            <p> Zip:{user?.zip}</p>
                        </div>
                        <div className='detail-item'>

                            <p>Phone:{user?.phone}</p>
                        </div>



                    </div>

                    <div className='col-md-6'>
                        <div className='detail-item'>
                            {user?.imageUrl?(
                                   <img src={user?.imageUrl} alt="User" className='img-fluid image-item' />
                                   ) : (
                                     <img src="https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png" alt="Default"  className=' img-fluid image-item'/>
                                   )}
                           
                        </div>
                    </div>
                </div>


                <Link to='/'>
                    <button className='btn-home'>back to home</button>
                </Link>

                <Link to='/edituser/:id'>
                    <button className='btn-home'>Edit my user</button>
                </Link>




            </div>

        </div>

    );
};


export default UserInfo;