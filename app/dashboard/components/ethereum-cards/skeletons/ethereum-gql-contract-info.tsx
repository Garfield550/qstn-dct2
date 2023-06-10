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
        <Skeleton asChild className="h-4 w-1/5">
          <span />
        </Skeleton>
      </InfoLine>
      <InfoLine title="Address:">
        <Skeleton asChild className="h-4 w-2/3">
          <span />
        </Skeleton>
      </InfoLine>
      <InfoLine title="Compiler Version:">
        <Skeleton asChild className="h-4 w-2/5">
          <span />
        </Skeleton>
      </InfoLine>
      <InfoLine title="Optimization:">
        <Skeleton asChild className="h-4 w-1/5">
          <span />
        </Skeleton>
      </InfoLine>
      <SourceBlock title="Contract Source Code:">
        <Skeleton className="h-52 rounded-md bg-muted" />
      </SourceBlock>
    </div>
  )
}
