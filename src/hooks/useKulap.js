import { Kulap } from "kulap-sdk"

const kulapSDK = new Kulap('access_key', window.ethereum)

const useKulap = () => {

    const getNetworkId = async () => {
        return await kulapSDK.getNetworkId()
    }

    const listSymbols = async () => {
        return kulapSDK.listSymbols()
    }

    const getRate = async (baseToken, pairToken, amountIn) => {
        const params = await kulapSDK.getRate(baseToken, pairToken, amountIn)
        return params
    }

    return {
        getNetworkId,
        listSymbols,
        getRate
    }
}

export default useKulap
