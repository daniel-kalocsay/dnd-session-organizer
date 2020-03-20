import React, {useEffect, useState} from "react";
import ColorTest from "../ColorTest";

const Menu = () => {
    const [menuItems, setMenuItems] = useState<[]>([]);

    let menuItemsStub: any;

    const initMenu = () => {
        return [
            {
                id: 0,
                title: "Menu item 1"
            },
            {
                id: 2,
                title: "ez itt a kert"
            },
            {
                id: 3,
                title: "Menu item 3"
            },
            {
                id: 4,
                title: "Menu item 4"
            },

        ]
    };

    useEffect( () => {
        menuItemsStub = initMenu();
        setMenuItems(menuItemsStub);
    }, []);

    return (
        <div style={styles.container}>
                {menuItems ? menuItems.map((item:any) => {
                   return (
                       <div style={styles.item}>
                               {item.title}
                       </div>
                   )
                }) : "No menu items"}

            <ColorTest />
        </div>
    )
};

export default Menu;

const styles = {
    container: {
        display: "grid",
        //TODO repeat dynamically
        gridTemplateColumns: `repeat(5, 1fr)`,
        margin: "0.5em",
        gridGap: "0.5em",
    },
    item: {
        display: "grid",
        border: "2px solid gray",
        justifyContent: "center"
    }
};