
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useAccount } from 'wagmi'
import Web3 from 'web3';

import { selectUrl, setOwner, setUrl } from '../../store/recordSlice';
import { config, truncateAddressString } from '../../util/web3/config';
import apis from '../../util/web3/web3';

import './domain-record.scss'

const DomainRecord = () => {
  const [ownerAddress, setOwnerAddress] = useState('');
  const { address } = useAccount();
  const dispatch = useAppDispatch();
  
  const name = useAppSelector(selectUrl);
  const tld = process.env.REACT_APP_TLD;
  
  useEffect(() => {
    const getSubdomain = () => {
      if (!window) {
        return null
      }
      console.log('getSubDomain()', window.location.host)
      const host = window.location.host
      const parts = host.split('.')
      console.log(host, parts, parts.length)
      if (parts.length <= 2) {
        return ''
      }
      if (parts.length <= 4) { // 3 CHANGE FOR PRODUCTION
        return parts[0]
      }
      return parts.slice(0, parts.length - 2).join('.')
    }
    
    const name = getSubdomain(); 
    if (name) {
      dispatch(setUrl(name))      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (name) {
      const web3 = new Web3(config.defaultRPC)
      const api = apis({ web3, address })
      console.log(api);
      api?.getRecord({ name }).then((r) => {
        dispatch(setOwner(r.renter))
        setOwnerAddress(r.renter);
      }).catch(e => console.log('ERRORRRRRR', { e }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, address])

  return (
    <div className='domain-record'>
      <div className='record-title'>{`${name}${tld}`}</div>
      <div className='record-owner'>{name && `Owner ${truncateAddressString(ownerAddress,10)}`}</div>
    </div>
  )
}

export default DomainRecord;