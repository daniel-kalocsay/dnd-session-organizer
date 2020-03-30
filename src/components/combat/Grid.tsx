class Square {
    active: boolean = false;
}

export class Grid {
    public tiles: Square[];
    public players: string[];

    constructor( size: 100 | 400 | 900, players: string[] ) {
        let tiles = []
        for (let i= 1; i<size; i++) {
            tiles.push(new Square())
        }
        this.tiles = tiles;
        this.players = players;
    }
}