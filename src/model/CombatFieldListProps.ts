import UserInfo from "./UserInfo";
import CombatfieldData from "./CombatfieldData";

export default class CombatFieldListProps {
    combatfields: CombatfieldData[];
    campaignId: string;
    players: UserInfo[];

    constructor(
        combatfields: CombatfieldData[],
        campaignId: string,
        players: UserInfo[]
    ) {
        this.combatfields = combatfields;
        this.campaignId = campaignId;
        this.players = players;
    }
}
