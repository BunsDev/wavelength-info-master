import FANTOM_LOGO from '../assets/images/fantom.svg';
import { 
    BALANCER_PRIMARY_COLOR, 
    BALANCER_SECONDARY_COLOR, 
    BALANCER_APP_LINK, 
    BALANCER_SUBGRAPH_URL, 
    BALANCER_SUBGRAPH_START_TIMESTAMP,
} from '../data/balancer/constants';

export enum SupportedNetwork {
    FANTOM,
}

export type NetworkInfo = {
    id: SupportedNetwork
    chainId: string
    route: string
    name: string
    startTimeStamp: number
    clientUri: string
    appUri: string
    imageURL: string
    bgColor: string
    primaryColor: string
    secondaryColor: string
    blurb?: string
};

export const FantomNetworkInfo: NetworkInfo = {
    id: SupportedNetwork.FANTOM,
    chainId: '20250',
    route: '',
    name: 'Fantom',
    startTimeStamp: BALANCER_SUBGRAPH_START_TIMESTAMP,
    appUri: BALANCER_APP_LINK,
    clientUri: BALANCER_SUBGRAPH_URL,
    bgColor: BALANCER_PRIMARY_COLOR,
    primaryColor: BALANCER_PRIMARY_COLOR,
    secondaryColor: BALANCER_SECONDARY_COLOR,
    imageURL: FANTOM_LOGO,
};

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [
    FantomNetworkInfo,
];
