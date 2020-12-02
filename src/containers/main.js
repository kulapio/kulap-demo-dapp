import { useEffect, useState, useCallback, useMemo } from "react"
import { Alert, Row, Col, Form, FormGroup, Label, Input, Spinner, Button } from "reactstrap"
import styled from "styled-components"
import Logo from "../assets/logo.png"
import useKulap from "../hooks/useKulap"
import Web3 from "web3"

const Image = styled.img`
    width: 180px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
`

const Buttons = styled.div`
    padding-top: 3px;
    padding-bottom: 3px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    button {
        margin-left: 5px;
    }
`

const MainPanel = styled(
    ({ className }) => {

        const { getNetworkId, listSymbols, getRate } = useKulap()

        const [networkId, setNetworkId] = useState()
        const [symbols, setSymbols] = useState([])
        // Token to swap
        const [baseToken, setBaseToken] = useState("ETH")
        // Token to receive
        const [pairToken, setPairToken] = useState("DAI")
        const [baseTokenAmount, setBaseTokenAmount] = useState(0)
        const [pairTokenAmount, setpairTokenAmount] = useState(0)

        const [params, setParams] = useState()
        const [loading, setLoading] = useState(false)

        useEffect(() => {

            (async () => {

                // List supported tokens
                const symbols = await listSymbols()
                setSymbols(symbols)
                // Check network id
                const networkId = await getNetworkId()
                setNetworkId(networkId)


            })()

        }, [])

        const checkRates = useCallback(async () => {
            if (baseTokenAmount > 0) {
                setLoading(true)
                const params = await getRate(baseToken, pairToken, baseTokenAmount)
                setParams(params)
                console.log("params --> ", params)
                if (params && params.rate) {
                    const toAmount = (baseTokenAmount) * params.rate
                    console.log("toAmount --> ", toAmount,  Web3.utils.fromWei(baseTokenAmount), params.rate)
                    setpairTokenAmount(toAmount)
                }
                setLoading(false)
            }

        }, [baseToken, pairToken, baseTokenAmount])

        return (
            <div className={className}>
                <div className="card">
                    <Image src={Logo} />

                    {/* {networkId !== 1 && (
                        <Alert color="warning">Please connect to the Mainnet</Alert>
                    )} */}
                    <Alert color="info">This app allows to fetch the rates using SDK.</Alert>

                    {/* Base Token  */}
                    <Row>
                        <Col xs="4">
                            <FormGroup>
                                <Label for="baseToken">From</Label>
                                <Input disabled={loading} value={baseToken} onChange={(e) => setBaseToken(e.target.value)} type="select" name="select" id="baseToken">
                                    {symbols.map((symbol, index) => {
                                        return (
                                            <option value={symbol} key={index}>{symbol}</option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="8">
                            <FormGroup>
                                <Label for="baseTokenAmount">Amount</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="baseTokenAmount"
                                    placeholder="Amount to swap"
                                    onChange={(e) => setBaseTokenAmount(e.target.value)}
                                    disabled={loading}
                                    value={baseTokenAmount}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/* Pair Token */}
                    <Row>
                        <Col xs="4">
                            <FormGroup>
                                <Label for="pairToken">To</Label>
                                <Input disabled={loading} value={pairToken} onChange={(e) => setPairToken(e.target.value)} type="select" name="select" id="pairToken">
                                    {symbols.map((symbol, index) => {
                                        return (
                                            <option value={symbol} key={index}>{symbol}</option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="8">
                            <FormGroup>
                                <Label for="pairToken">Receive</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="pairTokenAmount"
                                    value={pairTokenAmount}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="12">
                            <Buttons>
                                <Button onClick={checkRates} disabled={loading} color="primary">Check Rates</Button>
                            </Buttons>
                        </Col>
                        {/* <Col xs="12">
                            <Buttons>
                                <Button color="primary">Approve</Button>
                                <Button color="info">Swap</Button>
                            </Buttons>
                        </Col> */}
                    </Row>
                    {loading && <Loading />}

                </div>
            </div>
        )

    })`
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh  );
        padding-bottom: 80px;

        .card {
            height: 500px;
            width: 400px;
            background-color: white;
            border-radius: 5px;
            padding: 20px;
            font-size: 14px;
        }


    `

const Loading = styled(
    ({ className }) => {
        return (
            <div className={className}>
                <Spinner size="sm" color="dark" />
                <span>
                    Loading rates...
                 </span>

            </div>
        )
    })`
        font-size: 14px;
        margin-top: 10px;

        text-align: center;
        span {
            margin-left: 5px;
        }
    `


export default MainPanel