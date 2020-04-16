class CampaignPreviewData {
    name: string;
    uid: string;
    createdAt: Date;

    constructor(uid: string, name: string, createdAt: Date) {
        this.uid = uid;
        this.name = name;
        this.createdAt = createdAt;
    }

    getDate() {
        let date = this.createdAt;
        return date ?
            `${date.getFullYear()} ${date.getMonth()+1}.${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`
            : "date unknown";
    }
}

export default CampaignPreviewData;