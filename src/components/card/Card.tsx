import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CardProps } from "../../interface/Card";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteCard, favorite } from "../../services/ApiServices";
import "../card/Card.css";
import { UserContext } from "../../context/userContext";

export function Card({ cardItem }: { cardItem: CardProps }) {
  const { userData, favorites, setFavorites } = useContext(UserContext);
  const location = useLocation();
  const router = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async (_id: string) => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    try {
      const result = await favorite(_id).then((data) => {
        const updatedIsFavorite = !isFavorite;

        setIsFavorite(updatedIsFavorite);

        if (updatedIsFavorite) {
          setFavorites([...favorites, cardItem]);
        } else {
          setFavorites(favorites.filter((card) => card._id !== cardItem._id));
        }
        updatedIsFavorite
          ? toast.success(`${cardItem.title} added to favorites successfully!`)
          : toast.success(`${cardItem.title} removed from favorites!`);
      });
    } catch (error) {
      toast.error("its not possible adding this card to favorites");
    }
  };
  useEffect(() => {
    setIsFavorite(
      favorites.findIndex((card) => card._id === cardItem._id) !== -1
    );
  }, [cardItem, favorites]);

  const handlePhoneClick = () => {
    alert(`tel:${cardItem.phone}`);
  };

  const handleDeleteClick = async () => {
    try {
      const result = await deleteCard(cardItem._id);
      toast.success("card has been deleted successfully!");
      router(0);
    } catch (err) {
      toast.error("its not possible delete your card");
    }
  };

  return (
    <div
      className={`image-container card shadow p-3 mb-5 rounded mt-4 `}
      key={cardItem._id}
    >
      <NavLink to={`/cardinfo/${cardItem._id}`}>
        <img
          src={cardItem.imageUrl}
          className="card-img-top"
          alt={cardItem.imageAlt}
        />
      </NavLink>

      <div className="card-body p-3">
        <h3 className="card-title">{cardItem.title}</h3>

        <p className="card-text">{cardItem.subTitle}</p>
        <hr />
        <small className="card-text">Phone: {cardItem.phone}</small>
        <br />
        <small className="card-text">
          Address: {cardItem.street} {cardItem.houseNum}, {cardItem.city},
          {cardItem.country},zip:{cardItem.zip}
        </small>
        <br />
        <small className="card-text">Card Number: {cardItem.bizNumber}</small>

        <div className="mt-4">
          <table>
            <tbody>
              <tr>
                <td>
                  <button className="btn" onClick={handlePhoneClick}>
                    <i className="bi bi-telephone-fill ">
                      <a href="tel:"></a>
                    </i>
                  </button>
                </td>

                {userData?.user && (
                  <td>
                    <span
                      className={`bi bi-heart${isFavorite ? "-fill" : ""}`}
                      onClick={() =>
                        handleFavoriteClick(cardItem._id as string)
                      }
                    ></span>
                  </td>
                )}

                <td>
                  {location.pathname === "/adminarea" && (
                    <>
                      <i
                        className="bi bi-trash m-4 p-4"
                        onClick={handleDeleteClick}
                      ></i>
                      <i
                        className="bi bi-pencil  "
                        onClick={() => router(`/updatecard/${cardItem._id}`)}
                      ></i>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
