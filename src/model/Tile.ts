class Tile {
    uid: string;
    x: number;
    y: number;
    occupied_by: string;

    constructor(uid: string, x: number, y: number, occupied_by: string = "") {
        this.uid = uid;
        this.x = x;
        this.y = y;
        this.occupied_by = occupied_by;
    }
}

export default Tile;
