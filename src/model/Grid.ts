import Tile from "./Tile";

class Square {
    active: boolean = false;
}

export default class Grid {
    public tiles: Tile[];
    name: string;
    created_by: string;

    constructor(name: string, created_by: string, size: number) {
        this.name = name;
        this.created_by = created_by;
        let tiles = [];
        for (let i = 0; i < size; i++) {
            tiles.push(Object.assign({}, new Tile(i.toString(), i, i)));
        }
        this.tiles = tiles;
    }
}
