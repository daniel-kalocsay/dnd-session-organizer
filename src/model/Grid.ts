class Square {
    active: boolean = false;
}

export default class Grid {
    public tiles: Object[];
    //public players: string[];
    name: string;

    constructor(name: string, size: number) {
        this.name = name;
        let tiles = [];
        for (let i = 0; i < size; i++) {
            tiles.push(Object.assign({}, new Square()));
        }
        this.tiles = tiles;
        //this.players = players;
    }
}
