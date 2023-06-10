import dynamic from 'next/dynamic'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuroraExplorerGraphQlUrl } from '@/lib/apollo'

import { ApolloGraphQLProvider } from '../apollo-gql-provider'
import { EthereumGQLContractInfoSkeleton } from './skeletons/ethereum-gql-contract-info'

const endpoint = getAuroraExplorerGraphQlUrl()

const EthereumGQLContractInfo = dynamic(
  () => import('./ethereum-gql-contract-info'),
  {
    loading: () => <EthereumGQLContractInfoSkeleton />,
  }
)

export function EthereumGQLIntegrationCard() {
  return (
    <ApolloGraphQLProvider endpoint={endpoint}>
      <Card>
        <CardHeader>
          <CardTitle>Aurora Explorer GraphQL</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <EthereumGQLContractInfo />
        </CardContent>
      </Card>
    </ApolloGraphQLProvider>
  )
}
