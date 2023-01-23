import React, { useState, useEffect } from 'react'
import {Box, Button, Spinner, Text} from 'grommet';
import Web3 from 'web3'
import config from "../../config";
import Countdown from "react-countdown";
import {useAccount} from "wagmi";
import {Web3Button} from "@web3modal/react";

export interface SubscriptionProps {
    isSubscribed: boolean
    subscriptionStart: number
    subscriptionTimeout: number
    onSubscribe: () => void
    onUnsubscribe: () => void
}

export const Subscription = (props: SubscriptionProps) => {
    const { isSubscribed, subscriptionStart, subscriptionTimeout, onSubscribe, onUnsubscribe} = props

    const { isConnected, address, connector } = useAccount()
    const [txHash, setTxHash] = useState('')
    const [isConfirming, setIsConfirming] = useState(false)

    const onSendClicked = async () => {
        try {
            const provider = await connector!.getProvider()
            const web3 = new Web3(provider)
            const amount = web3.utils.toWei('10', 'ether');
            const transactionParameters = {
                // nonce: '0x00',
                gas: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(1000 * 1000 * 1000 * 1000),
                to: '0x95D02e967Dd2D2B1839347e0B84E59136b11A073',
                from: address,
                value: web3.utils.toHex(amount),
                // chainId: window.ethereum.networkVersion
            };
            setIsConfirming(true)
            await web3.eth.sendTransaction(transactionParameters)
            onSubscribe()
        } catch (e) {
            console.log('Cannot send tx:', e)
        } finally {
            setIsConfirming(false)
        }
    }

    const onSubscribeClicked = () => {
        const url = new URL(window.location.href);
        const successUrl = `${url.origin}/success`
        const stripeCheckoutLink = `${config.paymentsApiUrl}/stripe/checkout?mode=payment&successUrl=${successUrl}`

        window.open(stripeCheckoutLink, '_self')
    }

    return <Box direction={'row'} gap={'48px'} justify={'center'} align={'center'}>
        {!isSubscribed &&
          <Box direction={'row'} gap={'medium'}>
              <Box>
                  <Button primary onClick={onSubscribeClicked}>Subscribe ($1)</Button>
              </Box>
              <Box>
                  {!isConnected &&
                    <Box>
                        <Web3Button label="Connect Wallet" />
                    </Box>
                  }
                  {(isConnected && address) &&
                    <Box direction={'row'} gap={'medium'}>
                        <Box>
                            <Button primary disabled={isConfirming} onClick={onSendClicked}>
                                {isConfirming ? 'Confirming transaction...' : 'Subscribe (10 ONE)'}
                            </Button>
                        </Box>
                        {isConfirming &&
                          <Box>
                              <Spinner size={'small'} />
                          </Box>
                        }
                    </Box>
                  }
              </Box>
          </Box>
        }
        {isSubscribed &&
            <Box direction={'row'} gap={'48px'} justify={'center'} align={'center'}>
                <Box>
                    <Text size={'small'} color={'black'}>Subscription expire:</Text>
                    <Countdown date={subscriptionStart + subscriptionTimeout} />
                </Box>
                <Box>
                    <Button primary onClick={onUnsubscribe}>Unsubscribe</Button>
                </Box>
            </Box>
        }
    </Box>
}
