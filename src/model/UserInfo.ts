class UserInfo {
    uid: string | null;
    name: string;
    status: string | undefined; //TODO is there really no better way?

    constructor(uid: string | null, name: string)
    constructor(uid: string | null, name: string, status?: string) {
        this.uid = uid;
        this.name = name;
        this.status = status;
    };
}

export default UserInfo;
