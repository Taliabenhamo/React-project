import Title from "../../components/Title";
import { CardProps } from "../../interface/Card";
import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "../../components/card/Card";
import { deleteCard, getCards } from "../../services/ApiServices";

import { SearchOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import "../home/home.css"
enum SortDirection {
  asc = "asc", // A-Z
  desc = "desc", //Z-A
}
export function Home() {
  const [displayMode, setDisplayMode] = useState("grid");
  const [allCards, setAllcards] = useState<Array<CardProps>>([]);
  const [search, setSearch] = useState("");
  const [origData, setOrigData] = useState<Array<CardProps>>([]);
  const [sort, setSort] = useState(SortDirection.asc);

  useEffect(() => {
    getCards().then((json) => {
      setAllcards(json);
    });
  }, []);

  function handleSort(e: ChangeEvent<HTMLSelectElement>) {
    const direction = e.target.value as SortDirection;
    setSort(direction);

    let result = [...allCards];
    if (direction === SortDirection.desc) {
      result.sort((a, b) =>
        a.title > b.title ? -1 : a.title < b.title ? 1 : 0
      );
    } else {
      result.sort((a, b) =>
        a.title < b.title ? -1 : a.title > b.title ? 1 : 0
      );
    }

    setAllcards(result);
  }

  function isDataEmpty(): boolean {
    return origData.length === 0;
  }
  useEffect(() => {
    getCards().then((json) => {
      setAllcards(json);
      setOrigData(json);
    });
  }, []);

  function handleDisplayChange(mode: string) {
    setDisplayMode(mode);
  }
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setSearch(value);
    const term = value.toLowerCase();
    const result = [...origData].filter((card) =>
      card.title.toLowerCase().includes(term)
    );
    setAllcards(result);
  }

  return (
    <>
      <Title
        mainText="Bussiness Cards"
        subText="Here you can find Business Cards form all categories"
      />
      <div className="d-flex flex-column main m">
        <div className="px-3 sort">
          <button
            onClick={() => handleDisplayChange("grid")}
            className="btn btn-light mx-1 m-2"
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
        <div className="px-3 sort m-4">
          <TextField
            className="search-icon m-2 "
            id="standard-bare"
            variant="standard"
            placeholder="Search..."
            onChange={handleSearch}
            value={search}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchOutlined />
                </IconButton>
              ),
            }}
          />

          <select
            className="form-select  sort m-4"
            style={{ width: '80px', marginLeft: '4px' }}
            value={sort}
            onChange={handleSort}
            disabled={isDataEmpty()}
          >
            <option value={SortDirection.asc}> A-Z</option>
            <option value={SortDirection.desc}> Z-A</option>
          </select>
        </div>
      </div>

      {allCards.length === 0 && (<h1 className="message text-center m-4 ">There are no cards to show</h1>)}
      <div className={displayMode}>
        {allCards.map((cardItem) => (
          <Card key={cardItem._id} cardItem={cardItem} />
        ))}
      </div>


    </>
  );
}

export default Home;
