import { FrieventCategory } from "../models/FrieventCategory";
import { Place } from "../models/Place";

export const FRIEVENT_CATEGORIES: FrieventCategory[] = [
  {
    id: "1",
    name: "Coffee",
    img: require("./img/frievent_categories/coffee.png"),
  },
  {
    id: "2",
    name: "Food",
    img: require("./img/frievent_categories/food.png"),
  },
  {
    id: "3",
    name: "Cocktails",
    img: require("./img/frievent_categories/cocktails.png"),
  },
  {
    id: "4",
    name: "Cinema",
    img: require("./img/frievent_categories/cinema.png"),
  },
  {
    id: "5",
    name: "Football",
    img: require("./img/frievent_categories/football.png"),
  },
  {
    id: "6",
    name: "Basketball",
    img: require("./img/frievent_categories/basketball.png"),
  },
  {
    id: "7",
    name: "Bowling",
    img: require("./img/frievent_categories/bowling.png"),
  },
];

export const PLACES: Place[] = [
  {
    description: "Monastiraki, Greece",
    longitude: 123,
    latitude: 123,
  },
  {
    description: "Kifisia, Greece",
    longitude: 123,
    latitude: 123,
  },
  {
    description: "Agia Paraskevi, Greece",
    longitude: 123,
    latitude: 123,
  },
  {
    description: "Marousi, Greece",
    longitude: 123,
    latitude: 123,
  },
];
