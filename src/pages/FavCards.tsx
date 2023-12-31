import { useContext, useEffect, useState } from "react";
import { CardProps } from "../interface/Card";
import Title from "../components/Title";
import { Card } from "../components/card/Card";
import { UserContext } from "../context/userContext";
import { favorite, getFavorites } from "../services/ApiServices";
import { log } from "console";



function FavCards() {
    const [allFavoriteCards, setAllFavoriteCards] = useState<Array<CardProps>>([])
    const { userData,favorites } = useContext(UserContext);
    const [displayMode, setDisplayMode] = useState('grid');


    function handleDisplayChange(mode: string) {
        setDisplayMode(mode);
    }

    return (
        <>
            <Title
                mainText='Favorite Cards'
                subText='Here you can find your Fav Cards'
            />
            <div className='d-flex'>
                <div className='px-3 sort'>
                    <button
                        onClick={() => handleDisplayChange('grid')}
                        className='btn btn-light mx-1  m-2'
                    >
                        <i className='bi bi-grid-3x3-gap-fill'></i>
                    </button>
                    <button
                        onClick={() => handleDisplayChange('list')}
                        className='btn btn-light mx-1  m-2'
                    >
                        <i className='bi bi-list-ul'></i>
                    </button>
                </div>
            </div>





            {favorites.length === 0 && (
                <h1 className='text-center m-4'>No Favorite Cards to show</h1>
            )}
            <div className={displayMode}>
                {favorites.map((cardItem) => (
                    <Card
                        key={cardItem._id}
                        cardItem={cardItem}
                    />
                ))}
            </div>
        </>
    );
}


export default FavCards;