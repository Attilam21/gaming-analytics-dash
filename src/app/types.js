/** eFootball roles */
/// @typedef {'PT'|'TS'|'TD'|'DC'|'CDC'|'CC'|'TQ'|'ES'|'ED'|'SS'|'PTA'|'CF'} Role
/// @typedef {'Finalizzazione'|'Passaggio'|'Dribbling'|'Velocità'|'Contrasto'|'Intercetto'|'Colpo di testa'|'Calci piazzati'|'Pressing'|'Aggressività'|'Posizionamento'|'Uscite PT'} Skill

/** @typedef {{id:string,nome:string,ruoloNaturale:Role,ovr:number,build:string,booster?:string,skill:Skill[],piede:'Dx'|'Sx'|'Amb',images?:string[],note?:string}} Player */
/** @typedef {{playerId:string,x:number,y:number}} FormationSlot */
/** @typedef {{modulo:string,titolari:FormationSlot[],panchina:string[],players:Player[],updatedAt:string}} Roster */
/** @typedef {{possesso:number,tiri:number,tiriInPorta:number,passAccuracy:number,corner:number,falli:number,gol:number,golSubiti:number}} MatchStats */
/** @typedef {{x:number,y:number,t:number,tipo:'recupero'|'tiro'|'perdita'}} HeatEvent */
/** @typedef {{id:string,dataISO:string,avversario?:string,risultato:string,nostre:MatchStats,loro:MatchStats,heatmap:HeatEvent[],note?:string}} Match */
/** @typedef {{id:string,modulo:string,slots:{x:number,y:number,note?:string}[],contromisure?:string[]}} Opponent */
/** @typedef {{id:string,titolo:string,priorita:'bassa'|'media'|'alta',done:boolean}} CoachTask */
/** @typedef {{id:string,nome:string,ruoloNaturale:Role,ovr:number,build:string,booster?:string,skill:Skill[],piede:'Dx'|'Sx'|'Amb',note?:string}} Player */

export {}; // per farlo vedere come modulo
