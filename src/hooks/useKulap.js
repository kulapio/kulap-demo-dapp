import { Kulap } from "culap-sdk"

const kulapSDK = new Kulap('access_key', window.ethereum)

const useKulap = () => {

    const getNetworkId = async () => {
        return await kulapSDK.getNetworkId()
    }

    const listSymbols = async () => {
        return kulapSDK.listSymbols()
    }

    const getRate = async (baseToken, pairToken, amountIn) => {

        const amountInWei = amountIn * (10 ** 18)
        const params = await kulapSDK.getRate(baseToken, pairToken, amountInWei)
        return params
    }

    return {
        getNetworkId,
        listSymbols,
        getRate
    }
}

export default useKulap
