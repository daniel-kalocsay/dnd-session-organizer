class CampaignPreviewData {
    uid: string;
    name: string;
    createdAt: Date;
    DMName: string;
    DMId: string;
    playerIds: string[];
    combatfieldIds: string[];

    constructor(
        uid: string,
        name: string,
        createdAt: Date,
        DMName: string,
        DMId: string,
        playerIds: string[],
        combatfieldIds: string[]
    ) {
        this.uid = uid;
        this.name = name;
        this.createdAt = createdAt;
        this.DMName = DMName;
        this.DMId = DMId;
        this.playerIds = playerIds;
        this.combatfieldIds = combatfieldIds;
    }

    getDate() {
        let date = this.createdAt;
        return date
            ? `${date.getFullYear()} ${date.getMonth() + 1}.${date.getDate()}` +
                  ` at ${date.getHours()}:${date.getMinutes()}`
            : "unknown";
    }
}

export default CampaignPreviewData;
