export type EnergyMixResponse = {
    days: DailyMix[];
}
export type DailyMix = {
    date: string;
    gas: number;
    coal: number;
    biomass: number;
    nuclear: number;
    hydro: number;
    imports: number;
    wind: number;
    solar: number;
    other: number;
    cleanEnergyPercentage: number;
}