import { VelasNetworkInfo, NetworkInfo } from 'constants/networks';

export function networkPrefix(activeNewtork: NetworkInfo) {
    const isEthereum = activeNewtork === VelasNetworkInfo;
    if (isEthereum) {
        return '/';
    }
    const prefix = '/' + activeNewtork.route.toLocaleLowerCase() + '/';
    return prefix;
}
