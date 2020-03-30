class Square {
    active: boolean = false;
}

export class Grid {
    public tiles: Square[];

    constructor( size: 100 | 400 | 900 ) {
        let tiles = []
        for (let i= 1; i<size; i++) {
            tiles.push(new Square())
        }
        this.tiles = tiles;
    }
}