// this hook is created in order to exclude logic from component
// tanstack-query was used in order to handle errors and refetching strategy. additionaly I never used tanstack-query in project that will have CR
// type guard could be a good idea here

import { useQuery } from "@tanstack/react-query";

export type apiResponseElement = {
    M: boolean,
    T: number
    a: number
    f: number
    l: number
    m: boolean
    p: string
    q: string
}

export const useFetchApi = (symbol: string, refetchInterval?: number) => {
    const url = `https://api.binance.com/api/v3/aggTrades?symbol=${symbol}`
    const {data, error, isFetching, isLoading} = useQuery<Array<apiResponseElement>>({
        queryKey: ['fetchBinanceData'],
        queryFn: async () => {
            // in this case axios would be overkill - we need only one fetch here
            const response = await fetch(url);
            return response.json();
        },
        refetchInterval: refetchInterval
    })
    return {
        data,
        error,
        isFetching,
        isLoading
    }
}