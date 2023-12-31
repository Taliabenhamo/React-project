import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCardById } from "../../services/ApiServices";
import Title from "../../components/Title";
import { CardProps } from "../../interface/Card";
import "../cardInfo/Cardinfo.css"

const CardInfo = () => {
    const { id } = useParams();
    const [card, setCard] = useState<CardProps>();

    useEffect(() => {
        if (!id) return;
        getCardById(id).then((json) => {
            setCard(json);
        });
    }, []);
    return (
        <div className='card-details'>
            <Title mainText='Discover the Story Behind the Card' />
            <div className='container'>
                <div className='row info '>
                    <div className='col-md-6'>
                        <div className='detail-item'>
                            <h2>{card?.title}</h2>
                            <p>{card?.description}</p>
                        </div>

                        <div className='detail-item'>
                            <h3>Explore the Address</h3>
                            <p>
                                Located at {card?.street} {card?.houseNum} in the heart of {card?.city}, with a ZIP code of {card?.zip}.
                            </p>
                        </div>

                        <div className='detail-item'>
                            <h3>Contact Us</h3>
                            <p>Reach out to us at {card?.phone} for any inquiries or just to say hello!</p>
                        </div>

                        <div className='detail-item'>
                            <h3>Visit Our Website</h3>
                            <p>
                                Experience more about us on our website: {card?.web}
                            </p>
                        </div>
                    </div>

                    <div className='col-md-6'>

                        <img id='image' src={card?.imageUrl} alt={card?.imageAlt} className='img-fluid image-item' />

                    </div>
                </div>


                <Link to='/'>
                    <button className='btn-home'>Embark on Another Journey</button>
                </Link>



            </div>

        </div>
    );
};

export default CardInfo;

