class Square {
    active: boolean = false;
}

export default class Grid {
    public tiles: Object[];
    public players: string[];
    name: string;

    constructor( name: string, size: 100 | 400 | 900, players: string[] ) {
        this.name = name;
        let tiles = []
        for (let i= 1; i<size; i++) {
            tiles.push(Object.assign({}, new Square()))
        }
        this.tiles = tiles;
        this.players = players;
    }
}