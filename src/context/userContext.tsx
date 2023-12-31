import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../interface/User";
import { getUser } from "../auth/TokenManager";
import { getFavorites } from "../services/ApiServices";

interface UserData extends User {}
interface Props {
  children: ReactNode;
}

export type UserContextType = {
  userData: User | null;
  favorites: any[]
  setFavorites: (favs: any[]) => void
  setUserData: (data: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  userData: null,
  favorites: [],
  setFavorites:() => {},
  setUserData: () => {},
});
const userFromToken = getUser();

export const UserProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    setUserData(userFromToken ? userFromToken : null);
  }, []);

  useEffect(() => {
    if(favorites.length === 0) {
      const fetchem = async () => {
        const favorites = await getFavorites()
        setFavorites(favorites)
      }
      fetchem()
    }
  },[userData])

  

  return <UserContext.Provider value={{ userData, setUserData,favorites,setFavorites }}>{children}</UserContext.Provider>;
}