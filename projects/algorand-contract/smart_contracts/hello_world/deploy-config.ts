import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { IdeaVotingAppFactory } from '../artifacts/hello_world/IdeaVotingAppClient'

export async function deploy() {
  console.log('=== Deploying IdeaVotingApp ===')

  // Create Algorand client from environment (e.g., localnet)
  const algorand = AlgorandClient.fromEnvironment()
  const deployer = await algorand.account.fromEnvironment('DEPLOYER')

  // Create a typed factory for the IdeaVotingApp
  const factory = algorand.client.getTypedAppFactory(IdeaVotingAppFactory, {
    defaultSender: deployer.addr,
  })

  // Deploy the app
  const { appClient, result } = await factory.deploy({
    onUpdate: 'append',
    onSchemaBreak: 'append',
  })

  console.log(`App deployed: ${appClient.appName} (${appClient.appId})`)
  
  // Fund the app account with 1 Algo if newly created
  if (['create', 'replace'].includes(result.operationPerformed)) {
    await algorand.send.payment({
      sender: deployer.addr,
      receiver: appClient.appAddress,
      amount: (1).algo(),
    })
  }

  console.log('Deployment complete ✅')
}