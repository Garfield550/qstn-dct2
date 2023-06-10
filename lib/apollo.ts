import { environment } from '@/env/client'

export function getAuroraExplorerGraphQlUrl() {
  return environment.NEXT_PUBLIC_AURORA_EXPLORER_GQL_URL
}
