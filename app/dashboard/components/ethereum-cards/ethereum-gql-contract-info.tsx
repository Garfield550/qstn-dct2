'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import { AlertCircle } from 'lucide-react'
import React from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { InfoLine } from '../info-line'
import { SourceBlock } from '../source-block'

const contractInfoQuery = gql`
  query GetContractInfo($address: AddressHash!) {
    address(hash: $address) {
      contract: smartContract {
        name
        addressHash
        compilerVersion
        optimization
        contractSourceCode
      }
    }
  }
`

type ContractInfoQueryResult = {
  address: {
    contract: {
      addressHash: string
      compilerVersion: string
      contractSourceCode: string
      name: string
      optimization: boolean
    }
  }
}

export function EthereumGQLContractInfo() {
  const { data, error } = useSuspenseQuery<ContractInfoQueryResult>(
    contractInfoQuery,
    {
      variables: {
        address: '0x1875fcC416a92e04Ee23d2077203B02f3a51D0C0',
      },
    }
  )

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{error.name}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-md border p-4 text-sm">
      <h4 className="scroll-m-20 !text-lg font-semibold tracking-tight">
        Contract Info
      </h4>
      <InfoLine title="Name:">{data.address.contract.name}</InfoLine>
      <InfoLine title="Address:">{data.address.contract.addressHash}</InfoLine>
      <InfoLine title="Compiler Version:">
        {data.address.contract.compilerVersion}
      </InfoLine>
      <InfoLine title="Optimization:">
        {data.address.contract.optimization ? 'Enabled' : 'Disabled'}
      </InfoLine>
      <SourceBlock title="Contract Source Code:">
        {data.address.contract.contractSourceCode}
      </SourceBlock>
    </div>
  )
}

export default EthereumGQLContractInfo
