import { useEffect, useState } from "react";
import { getCards } from "../../services/ApiServices";
import { CardProps } from "../../interface/Card";
import { Card } from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export function Dashboard() {
  const navigate = useNavigate();
  const [allCards, setAllcards] = useState<Array<CardProps>>([]);
  const [displayMode, setDisplayMode] = useState("grid");

  useEffect(() => {
    getCards().then((json) => {
      setAllcards(json);
    });
  }, []);

  function handleDisplayChange(mode: string) {
    setDisplayMode(mode);
  }

  return (
    <div>
      <Title
        mainText="Wellcome Admin"
        subText="Here you can create your own visit cards"
      ></Title>
      <div className="d-flex main">
        <div className="px-3 sort">
          <button
            onClick={() => handleDisplayChange("grid")}
            className="btn btn-light mx-1  m-2"
          >
            <i className="bi bi-grid-3x3-gap-fill"></i>
          </button>
          <button
            onClick={() => handleDisplayChange("list")}
            className="btn btn-light mx-1  m-2"
          >
            <i className="bi bi-list-ul"></i>
          </button>
        </div>
      </div>

      <div onClick={() => navigate("/addCard")} className=" m-4">
        <AddCircleIcon style={{ fontSize: 80 }} />
      </div>

      {allCards.length === 0 && (
        <h1 className="text-center m-4">There are no Cards to show</h1>
      )}
      <div className={displayMode}>
        {allCards.map((cardItem) => (
          <Card key={cardItem._id} cardItem={cardItem} />
        ))}
      </div>
    </div>
  );
}
