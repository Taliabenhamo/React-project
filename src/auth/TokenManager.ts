
import { User } from "../interface/User";
import { CardProps } from "react-bootstrap";

const userKey = 'user';
const tokenKey = 'token';
const cardKey = 'card';



export function getItem(): CardProps | undefined {
  const card = localStorage.getItem(cardKey);
  if (!card) return undefined;

  try {
    const parsedCard = JSON.parse(card);
    return parsedCard;
  } catch (error) {

    console.error('Error parsing card JSON:', error);
    return undefined;
  }
}
export function setUser(user: User) {
  if (!user) return;
  const stringfyUser = JSON.stringify(user);
  localStorage.setItem(userKey, stringfyUser);
}



export function getUser(): User | undefined {
  const user = localStorage.getItem(userKey);
  if (!user) return;
  const parsedUser = JSON.parse(user);
  return parsedUser;
}

export function removeUser() {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
  window.location.reload();

}



export function setToken(tokenValue?: string) {
  if (!tokenValue) return;
  localStorage.setItem(tokenKey, tokenValue);
}

export function getToken(): string {
  return localStorage.getItem(tokenKey) || '';
}

export function removeToken() {
  localStorage.removeItem(tokenKey);
}


