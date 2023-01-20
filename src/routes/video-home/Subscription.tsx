import React from 'react'
import {Box, Button, Text} from 'grommet';
import config from "../../config";
import Countdown from "react-countdown";

export interface SubscriptionProps {
    isSubscribed: boolean
    subscriptionStart: number
    subscriptionTimeout: number
    onUnsubscribe: () => void
}

export const Subscription = (props: SubscriptionProps) => {
    const { isSubscribed, subscriptionStart, subscriptionTimeout, onUnsubscribe} = props
    const onSubscribeClicked = () => {
        const url = new URL(window.location.href);
        const successUrl = `${url.origin}/success`
        const stripeCheckoutLink = `${config.paymentsApiUrl}/stripe/checkout?mode=payment&successUrl=${successUrl}`

        window.open(stripeCheckoutLink, '_self')
    }

    return <Box direction={'row'} gap={'48px'} justify={'center'} align={'center'}>
        {!isSubscribed &&
          <Button primary onClick={onSubscribeClicked}>Subscribe ($1)</Button>
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
