import React, { useEffect, useState } from "react";

const Menu = () => {
    const [menuItems, setMenuItems] = useState<[]>([]);

    let menuItemsStub: any;

    const initMenu = () => {
        return [
            {
                id: 0,
                title: "Menu item 1",
            },
            {
                id: 2,
                title: "Menu item 2",
            },
            {
                id: 3,
                title: "Menu item 3",
            },
            {
                id: 4,
                title: "Menu item 4",
            },
        ];
    };

    useEffect(() => {
        menuItemsStub = initMenu();
        setMenuItems(menuItemsStub);
    }, []);

    return (
        <div style={styles.container}>
            {menuItems
                ? menuItems.map((item: any) => {
                      return (
                          <div key={item.id} style={styles.item}>
                              {item.title}
                          </div>
                      );
                  })
                : "No menu items"}
        </div>
    );
};

export default Menu;



const styles = {
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        margin: "0.5em",
        gridGap: "0.5em",
    },
    item: {
        display: "grid",
        border: "2px solid gray",
        justifyContent: "center",
    },
};
