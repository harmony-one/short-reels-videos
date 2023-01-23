import React, { useState } from 'react'
import {Box, Button, Text} from 'grommet';
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

    const { isConnected, address } = useAccount()
    const [txHash, setTxHash] = useState('')

    const onSendClicked = async () => {
        try {
            const web3 = new Web3('https://api.harmony.one')
            const amount = web3.utils.toWei('10', 'ether');
            const transactionParameters = {
                nonce: '0x00',
                gas: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(1000 * 1000 * 1000 * 1000),
                to: '0x0000000000000000000000000000000000000000',
                from: address,
                value: web3.utils.toHex(amount),
                chainId: window.ethereum.networkVersion
            };
            const hash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            setTxHash(hash)
            onSubscribe()
        } catch (e) {
            console.log('Cannot send tx:', e)
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
                    <Box>
                        <Box>
                            <Button primary onClick={onSendClicked}>
                                Subscribe (10 ONE)
                            </Button>
                        </Box>
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
