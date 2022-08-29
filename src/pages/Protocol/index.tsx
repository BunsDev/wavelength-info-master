import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AutoColumn } from 'components/Column';
import { TYPE } from 'theme';
import { ResponsiveRow, RowBetween, RowFixed } from 'components/Row';
import LineChart from 'components/LineChart/alt';
import useTheme from 'hooks/useTheme';
import { DarkGreyCard } from 'components/Card';
import { formatAmount, formatDollarAmount } from 'utils/numbers';
import Percent from 'components/Percent';
import { HideMedium, HideSmall, StyledInternalLink } from '../../theme';
import TokenTable from 'components/tokens/TokenTable';
import { PageWrapper, ThemedBackgroundGlobal } from 'pages/styled';
import BarChart from 'components/BarChart/alt';
import { SmallOptionButton } from 'components/Button';
import { MonoSpace } from 'components/shared';
import { useActiveNetworkVersion } from 'state/application/hooks';
import { VolumeWindow } from 'types';
import { useBalancerTokens } from '../../data/balancer/useTokens';
import { useBalancerProtocolData } from '../../data/balancer/useProtocolData';
import PoolTable from '../../components/pools/PoolTable';
import { useBalancerPools } from '../../data/balancer/usePools';
import SwapsTable from '../../components/TransactionsTable/SwapsTable';
import Loader, { LocalLoader } from '../../components/Loader';
import { useTransformedVolumeData } from 'hooks/chart';
import { useBalancerChainProtocolData } from 'data/balancer/useAggregatedProtocolData';
import { VelasNetworkInfo } from 'constants/networks';
import { blockClient, client } from 'apollo/client';
import StackedAreaChart from 'components/StackedAreaChart';
import BarChartStacked from 'components/BarChartStacked';
import getAggregatedProtocolChartData from 'utils/getAggregatedProtocolChartData';

const ChartWrapper = styled.div`
    width: 49%;

    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`;

export default function Protocol() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const theme = useTheme();

    const [activeNetwork] = useActiveNetworkVersion();
    const protocolData = useBalancerChainProtocolData(VelasNetworkInfo.clientUri, VelasNetworkInfo.startTimeStamp, blockClient, client);

    //---Aggregated TVL Data---
    let aggregatedTVL:any[] = [];
    let  protocolTVL = 0;
    let protocolTVLChange = 0;
    //Create aggregate / stitched together TVL test:
    if (protocolData.tvlData ) {
        aggregatedTVL = getAggregatedProtocolChartData(protocolData.tvlData,NaN)
        if (protocolData.tvl) {
            protocolTVL = protocolData.tvl;
        }
        if (protocolData.tvlChange) {
            protocolTVLChange = protocolData.tvlChange;
        }
    }

    //---Aggregated Trading volume data---
    let aggregatedVolume:any[] = [];
    let  protocolVolume = 0;
    let protocolVolumeChange = 0
    if (protocolData.volumeData) {
        aggregatedVolume = getAggregatedProtocolChartData(protocolData.volumeData, 0)
        if (protocolData.volume24 ) {
            protocolVolume = protocolData.volume24;
        }
        if (protocolData.volumeChange) {
            protocolVolumeChange = protocolData.volumeChange;
        }
    }
    let aggregatedWeeklyVolume:any[] = [];
    const weeklyVolumeData = useTransformedVolumeData(protocolData?.volumeData, 'week');
    if (weeklyVolumeData) {
        //time, value, chainId
        aggregatedWeeklyVolume = getAggregatedProtocolChartData(weeklyVolumeData, 0)
    }

    //---Aggregated Swaps data---
    let aggregatedSwaps:any[] = [];
    let  protocolSwaps = 0;
    if (protocolData.swapData) {
        aggregatedSwaps = getAggregatedProtocolChartData(protocolData.swapData,0)
        if (protocolData.swaps24) {
            protocolSwaps = protocolData.swaps24;
        }
        if (protocolData.swaps24) {
            protocolSwaps = protocolData.swaps24;
        }
    }
    let aggregatedWeeklySwaps:any[] = [];
    const weeklySwapData = useTransformedVolumeData(protocolData?.swapData, 'week');

    if (weeklySwapData) {
        //time, value, chainId
        aggregatedWeeklySwaps = getAggregatedProtocolChartData(weeklySwapData, 0)
    }

    //---Aggregated fee data
        //---Aggregated Swaps data---
        let aggregatedFees:any[] = [];
        let  protocolFees = 0;
        let protocolFeesChange = 0;
        if (protocolData.feeData) {
            aggregatedFees = getAggregatedProtocolChartData(protocolData.feeData, 0)
            if (protocolData.fees24) {
                protocolFees = protocolData.fees24;
            }
            if (protocolData.feesChange) {
                protocolFeesChange = protocolData.feesChange;
            }
        }
        let aggregatedWeeklyFees:any[] = [];
        const weeklyFeeData = useTransformedVolumeData(protocolData?.feeData, 'week');    
        if (weeklySwapData) {
            //time, value, chainId
            aggregatedWeeklyFees = getAggregatedProtocolChartData(weeklyFeeData, 0)
        }
    

    const [volumeHover, setVolumeHover] = useState<number | undefined>();
    const [liquidityHover, setLiquidityHover] = useState<number | undefined>();
    const [feesHover, setFeesHover] = useState<number | undefined>();
    const [swapsHover, setSwapsHover] = useState<number | undefined>();
    const [leftLabel, setLeftLabel] = useState<string | undefined>();
    const [rightLabel, setRightLabel] = useState<string | undefined>();
    const [swapsLabel, setSwapsLabel] = useState<string | undefined>();
    const [feesLabel, setFeesLabel] = useState<string | undefined>();
    
    useEffect(() => {
        setLiquidityHover(protocolTVL);
        setVolumeHover(protocolVolume);
        setFeesHover(protocolFees);
        setSwapsHover(protocolSwaps);
    }, [activeNetwork, protocolTVL]);

    // if hover value undefined, reset to current day value
    useEffect(() => {
        if (!volumeHover && protocolData) {
            setVolumeHover(protocolVolume);
        }
    }, [volumeHover, protocolData]);

    useEffect(() => {
        if (liquidityHover === undefined && protocolTVL > 0) {
          setLiquidityHover(protocolTVL)
        }
      }, [liquidityHover, protocolData])

    useEffect(() => {
        if (!feesHover && protocolData) {
            setFeesHover(protocolFees);
        }
    }, [feesHover, protocolData]);

    useEffect(() => {
        if (!swapsHover && protocolData?.swaps24) {
            setSwapsHover(protocolSwaps);
        }
    }, [swapsHover, protocolData]);

    return (
        <PageWrapper>
            <ThemedBackgroundGlobal backgroundColor={'#7f7f7f'} />
            <AutoColumn gap="16px">
                <TYPE.largeHeader>Wavelength: Protocol Overview</TYPE.largeHeader>
                {weeklyVolumeData.length > 0 ?
                <ResponsiveRow>
                    <ChartWrapper>
                        <StackedAreaChart
                            data={aggregatedTVL}
                            tokenSet={['Velas']}
                            colorSet={[VelasNetworkInfo.primaryColor]}
                            height={220}
                            minHeight={332}
                            color={activeNetwork.primaryColor}
                            value={liquidityHover}
                            label={leftLabel}
                            topLeft={
                                <AutoColumn gap="4px">
                                    <TYPE.mediumHeader fontSize="16px">TVL</TYPE.mediumHeader>
                                    <TYPE.largeHeader fontSize="32px">
                                        <MonoSpace>{formatDollarAmount(liquidityHover, 2, true)} </MonoSpace>
                                    </TYPE.largeHeader>
                                    <TYPE.main fontSize="12px" height="14px">
                                        {leftLabel ? <MonoSpace>{leftLabel} (UTC)</MonoSpace> : null}
                                    </TYPE.main>
                                </AutoColumn>
                            }
                        />
                    </ChartWrapper>
                    {protocolData.volumeData ?
                    <ChartWrapper>
                    <BarChartStacked
                            height={220}
                            minHeight={332}
                            data={aggregatedWeeklyVolume}
                            color={activeNetwork.primaryColor}
                            tokenSet={['Velas']}
                            colorSet={[VelasNetworkInfo.primaryColor]}
                            isDollarAmount={true}
                            value={volumeHover}
                            label={rightLabel}
                            topLeft={
                                <AutoColumn gap="4px">
                                    <TYPE.mediumHeader fontSize="16px">Weekly Trading Volume</TYPE.mediumHeader>
                                    <TYPE.largeHeader fontSize="32px">
                                        <MonoSpace> {formatDollarAmount(volumeHover, 2)}</MonoSpace>
                                    </TYPE.largeHeader>
                                    <TYPE.main fontSize="12px" height="14px">
                                        {rightLabel ? <MonoSpace>{rightLabel} (UTC)</MonoSpace> : null}
                                    </TYPE.main>
                                </AutoColumn>
                            }
                        />
                    </ChartWrapper> : null }
                </ResponsiveRow> : <Loader/> }
                {weeklySwapData.length > 0 ?
                <ResponsiveRow>
                <ChartWrapper>
                <BarChartStacked
                            height={220}
                            minHeight={332}
                            data={aggregatedWeeklySwaps}
                            color={activeNetwork.primaryColor}
                            tokenSet={['Velas']}
                            colorSet={[VelasNetworkInfo.primaryColor]}
                            value={swapsHover}
                            label={swapsLabel}
                            topLeft={
                                <AutoColumn gap="4px">
                                    <TYPE.mediumHeader fontSize="16px">Weekly Swaps</TYPE.mediumHeader>
                                    <TYPE.largeHeader fontSize="32px">
                                        <MonoSpace> {formatAmount(swapsHover, 2)}</MonoSpace>
                                    </TYPE.largeHeader>
                                    <TYPE.main fontSize="12px" height="14px">
                                        {swapsLabel ? <MonoSpace>{swapsLabel} (UTC)</MonoSpace> : null}
                                    </TYPE.main>
                                </AutoColumn>
                            }
                        />
                </ChartWrapper>
                <ChartWrapper>
                        <BarChartStacked
                            height={220}
                            minHeight={332}
                            data={aggregatedWeeklyFees
                            }
                            color={activeNetwork.primaryColor}
                            tokenSet={['Velas']}
                            colorSet={[VelasNetworkInfo.primaryColor]}
                            value={feesHover}
                            label={feesLabel}
                            topLeft={
                                <AutoColumn gap="4px">
                                    <TYPE.mediumHeader fontSize="16px">Weekly Collected fees</TYPE.mediumHeader>
                                    <TYPE.largeHeader fontSize="32px">
                                        <MonoSpace> {formatDollarAmount(feesHover, 2)}</MonoSpace>
                                    </TYPE.largeHeader>
                                    <TYPE.main fontSize="12px" height="14px">
                                        {feesLabel ? <MonoSpace>{feesLabel} (UTC)</MonoSpace> : null}
                                    </TYPE.main>
                                </AutoColumn>
                            }
                        />
                    </ChartWrapper>
            </ResponsiveRow> : null }
                {protocolVolume > 0 && protocolFees > 0 && protocolTVL > 0 ?
                <HideSmall>
                    <DarkGreyCard>
                        <RowBetween>
                            <RowFixed align="center" justify="center">
                                <RowFixed mr="20px">
                                    <TYPE.main mr="4px">Weekly volume: </TYPE.main>
                                    <TYPE.label mr="4px">{formatDollarAmount(protocolVolume)}</TYPE.label>
                                    <Percent value={protocolVolumeChange} wrap={true} />
                                </RowFixed>
                                <RowFixed mr="20px">
                                    <TYPE.main mr="4px">Weekly fees: </TYPE.main>
                                    <TYPE.label mr="4px">{formatDollarAmount(protocolFees)}</TYPE.label>
                                    <Percent value={protocolFeesChange} wrap={true} />
                                </RowFixed>
                                <HideMedium>
                                    <RowFixed mr="20px">
                                        <TYPE.main mr="4px">TVL: </TYPE.main>
                                        <TYPE.label mr="4px">{formatDollarAmount(protocolTVL)}</TYPE.label>
                                        <TYPE.main></TYPE.main>
                                        <Percent value={protocolTVLChange} wrap={true} />
                                    </RowFixed>
                                </HideMedium>
                            </RowFixed>
                        </RowBetween>
                    </DarkGreyCard>
                </HideSmall> : null }
            </AutoColumn>
        </PageWrapper>
    );
}
