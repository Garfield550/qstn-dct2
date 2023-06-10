import { Skeleton } from '@/components/ui/skeleton'

import { InfoLine } from '../../info-line'
import { SourceBlock } from '../../source-block'

export function EthereumGQLContractInfoSkeleton() {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-md border p-4 text-sm">
      <h4 className="scroll-m-20 !text-lg font-semibold tracking-tight">
        Contract Info
      </h4>
      <InfoLine title="Name:">
        <Skeleton className="h-4 w-1/5" />
      </InfoLine>
      <InfoLine title="Address:">
        <Skeleton className="h-4 w-2/3" />
      </InfoLine>
      <InfoLine title="Compiler Version:">
        <Skeleton className="h-4 w-2/5" />
      </InfoLine>
      <InfoLine title="Optimization:">
        <Skeleton className="h-4 w-1/5" />
      </InfoLine>
      <SourceBlock title="Contract Source Code:">
        <Skeleton className="h-52 rounded-md bg-muted" />
      </SourceBlock>
    </div>
  )
}
