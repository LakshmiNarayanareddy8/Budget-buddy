import { IconBase } from "react-icons/lib";
import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id:"01",
        name:"Dashboard",
        icon: LuLayoutDashboard,
        path:"/dashboard",
    },
    {
        id:"02",
        name:"Income",
        icon: LuHandCoins,
        path:"/income",
    },
    {
        id:"03",
        name:"Expense",
        icon: LuWalletMinimal,
        path:"/expense",
    },
    {
        id:"06",
        name:"Logout",
        icon: LuLogOut,
        path:"/logout",
    },
];