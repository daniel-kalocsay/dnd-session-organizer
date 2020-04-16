class CampaignPreviewData {
    uid: string;
    name: string;
    createdAt: Date;
    playerIds: string[];

    constructor(uid: string, name: string, createdAt: Date, playerIds: any[]) {
        this.uid = uid;
        this.name = name;
        this.createdAt = createdAt;
        this.playerIds = playerIds;
    }

    getDate() {
        let date = this.createdAt;
        return date ?
            `${date.getFullYear()} ${date.getMonth() + 1}.${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`
            : "unknown";
    }
}

export default CampaignPreviewData;
