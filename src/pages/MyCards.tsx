import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { getMyCards } from "../services/ApiServices";
import { CardProps } from "../interface/Card";
import { UserContext } from "../context/userContext";
import { Card } from "../components/card/Card";
import { useTheme } from "@mui/material";


function MyCards() {

    const [allMyCards, setAllMyCards] = useState<Array<CardProps>>([])
    const [displayMode, setDisplayMode] = useState('grid');



    useEffect(() => {
        getMyCards().then((json) => {

            setAllMyCards(json)
        }).catch(err => console.log(err))
    }, [])

    function handleDisplayChange(mode: string) {
        setDisplayMode(mode);
    }

    return (
        <>
            <Title
                mainText='My Cards'
                subText='Here you can find your Cards'
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

            {allMyCards.length === 0 && <h1 className="text-center m-4">There are no Cards to show , try to create one!</h1>}
            <div className={displayMode}>

                {allMyCards.map((cardItem) => (
                    <Card
                        key={cardItem._id}
                        cardItem={cardItem}   />
                ))}


            </div>

        </>
    );
}

export default MyCards;