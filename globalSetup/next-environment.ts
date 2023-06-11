import { loadEnvConfig } from '@next/env'

export default async function loadEnvironment() {
  const projectDirection = process.cwd()
  loadEnvConfig(projectDirection)
}
