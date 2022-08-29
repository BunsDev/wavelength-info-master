import { BalancerChartDataItem } from "data/balancer/balancerTypes";

//TODO: remove hard-coded chain redundancy via passable variable?
export default function getAggregatedProtocolChartData(
    velasChartData: BalancerChartDataItem[], 
    defaultValue: number,
     ){

        //TODO: aggregated interface
        const aggregatedData:any[] = [];
        //time, value, chainId
        velasChartData.forEach((el) => {
            //add chain info
            const aggregatedEntry = {
                time: el.time,
                Velas: el.value,
            }
            aggregatedData.push(aggregatedEntry);
        })
        return aggregatedData;
}