// asset imports remain unchanged
import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg";
import close_icon from "./close_icon.svg";
import users_icon from "./users_icon.svg";
import car_icon from "./car_icon.svg";
import location_icon from "./location_icon.svg";
import fuel_icon from "./fuel_icon.svg";
import addIcon from "./addIcon.svg";
import carIcon from "./carIcon.svg";
import carIconColored from "./carIconColored.svg";
import dashboardIcon from "./dashboardIcon.svg";
import dashboardIconColored from "./dashboardIconColored.svg";
import addIconColored from "./addIconColored.svg";
import listIcon from "./listIcon.svg";
import listIconColored from "./listIconColored.svg";
import cautionIconColored from "./cautionIconColored.svg";
import arrow_icon from "./arrow_icon.svg";
import star_icon from "./star_icon.svg";
import check_icon from "./check_icon.svg";
import tick_icon from "./tick_icon.svg";
import delete_icon from "./delete_icon.svg";
import eye_icon from "./eye_icon.svg";
import eye_close_icon from "./eye_close_icon.svg";
import filter_icon from "./filter_icon.svg";
import edit_icon from "./edit_icon.svg";
import calendar_icon_colored from "./calendar_icon_colored.svg";
import location_icon_colored from "./location_icon_colored.svg";
import testimonial_image_1 from "./testimonial_image_1.png";
import testimonial_image_2 from "./testimonial_image_2.png";
import main_car from "./main_car.png";
import banner_car_image from "./banner_car_image.jpg";
import user_profile from "./user_profile.png";
import upload_icon from "./upload_icon.svg";
import car_image1 from "./car_image1.webp";
import car_image2 from "./car_image2.jpg";
import car_image3 from "./car_image3.webp";
import car_image4 from "./car_image4.jpg";

export const cityList = ["New York", "Los Angeles", "Houston", "Chicago"];

export const assets = {
  logo,
  gmail_logo,
  facebook_logo,
  instagram_logo,
  twitter_logo,
  menu_icon,
  search_icon,
  close_icon,
  users_icon,
  edit_icon,
  car_icon,
  location_icon,
  fuel_icon,
  addIcon,
  carIcon,
  carIconColored,
  dashboardIcon,
  dashboardIconColored,
  addIconColored,
  listIcon,
  listIconColored,
  cautionIconColored,
  calendar_icon_colored,
  location_icon_colored,
  arrow_icon,
  star_icon,
  check_icon,
  tick_icon,
  delete_icon,
  eye_icon,
  eye_close_icon,
  filter_icon,
  testimonial_image_1,
  testimonial_image_2,
  main_car,
  banner_car_image,
  car_image1,
  upload_icon,
  user_profile,
  car_image2,
  car_image3,
  car_image4,
};

export const menuLinks = [
  { name: "Home", path: "/" },
  { name: "Consoles", path: "/games" },
  { name: "My Bookings", path: "/my-bookings" },
];

export const ownerMenuLinks = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: dashboardIcon,
    coloredIcon: dashboardIconColored,
  },
  {
    name: "Add Console",
    path: "/owner/addgame",
    icon: addIcon,
    coloredIcon: addIconColored,
  },
  {
    name: "Manage Consoles",
    path: "/owner/managegames",
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/%3E%3C/svg%3E",
    coloredIcon:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/%3E%3C/svg%3E",
  },
  {
    name: "Manage Bookings",
    path: "/owner/managebookings",
    icon: listIcon,
    coloredIcon: listIconColored,
  },
];

export const dummyUserData = {
  _id: "6847f7cab3d8daecdb517095",
  name: "Nomesh",
  email: "admin@example.com",
  role: "owner",
  image: user_profile,
};

export const dummyGameData = [
  {
    _id: "67ff5bc069c03d4e45f30b77",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "PS5",
    model: "Pro",
    image: car_image1,
    year: 2020,
    category: "game",
    pricePerDay: 23,
    location: "New York",
    description:
      "The PS5 Pro is Sony's most powerful game yet, offering faster performance, enhanced ray tracing, and advanced AI upscaling",
    isAvaliable: true,
    createdAt: "2025-04-16T07:26:56.215Z",
  },
  {
    _id: "67ff6b758f1b3684286a2a65",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Ps4",
    model: "Pro",
    image: car_image2,
    year: 2021,
    category: "game",
    pricePerDay: 20,
    location: "Chicago",
    description:
      "The PS4 is Sony's best-selling game of its generation, known for its strong game library and reliable performance.",
    isAvaliable: true,
    createdAt: "2025-04-16T08:33:57.993Z",
  },
  {
    _id: "67ff6b9f8f1b3684286a2a68",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Nintenedo ",
    model: "Switch",
    image: car_image3,
    year: 2023,
    category: "game",
    pricePerDay: 200,
    location: "Los Angeles",
    description:
      "The Nintendo Switch is a versatile hybrid game loved for its portability, exclusive games, and seamless switch between handheld and TV modes.",
    isAvaliable: true,
    createdAt: "2025-04-16T08:34:39.592Z",
  },
  {
    _id: "68009c93a3f5fc6338ea7e34",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    brand: "Xbox series",
    model: "X",
    image: car_image4,
    year: 2022,
    category: "game",
    pricePerDay: 18,
    location: "Houston",
    description:
      "The Xbox Series X is Microsoft's most powerful game, delivering 4K gaming, fast load times, and seamless performance with Game Pass integration.",
    isAvaliable: true,
    createdAt: "2025-04-17T06:15:47.318Z",
  },
];

export const dummyMyBookingsData = [
  {
    _id: "68482bcc98eb9722b7751f70",
    game: dummyGameData[0],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-13T00:00:00.000Z",
    returnDate: "2025-06-14T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T12:57:48.244Z",
  },
  {
    _id: "68482bb598eb9722b7751f60",
    game: dummyGameData[1],
    user: "6847f7cab3d8daecdb517095",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    pickupDate: "2025-06-12T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "pending",
    price: 130,
    createdAt: "2025-06-10T12:57:25.613Z",
  },
  {
    _id: "684800fa0fb481c5cfd92e56",
    game: dummyGameData[2],
    user: "6847f7cab3d8daecdb517095",
    owner: "67fe3467ed8a8fe17d0ba6e2",
    pickupDate: "2025-06-11T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "pending",
    price: 600,
    createdAt: "2025-06-10T09:55:06.379Z",
  },
  {
    _id: "6847fe790fb481c5cfd92d94",
    game: dummyGameData[3],
    user: "6847f7cab3d8daecdb517095",
    owner: "6847f7cab3d8daecdb517095",
    pickupDate: "2025-06-11T00:00:00.000Z",
    returnDate: "2025-06-12T00:00:00.000Z",
    status: "confirmed",
    price: 440,
    createdAt: "2025-06-10T09:44:25.410Z",
  },
];

export const dummyDashboardData = {
  totalGames: 4,
  totalBookings: 2,
  pendingBookings: 0,
  completedBookings: 2,
  recentBookings: [dummyMyBookingsData[0], dummyMyBookingsData[1]],
  monthlyRevenue: 840,
};
