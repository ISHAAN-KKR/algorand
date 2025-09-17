import { Contract, GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'

export class IdeaVotingApp extends Contract {
  // ✅ Global state variables with initial values
  ideaCount = GlobalState<uint64>({ initialValue: 0 })
  totalVotes = GlobalState<uint64>({ initialValue: 0 })
  votersCount = GlobalState<uint64>({ initialValue: 0 })

  // No createApplication() needed unless custom logic

  addIdea(): void {
    this.ideaCount.value += 1
  }

  vote(): void {
    this.totalVotes.value += 1
    this.votersCount.value += 1
  }

  getWinner(): uint64 {
    return this.totalVotes.value
  }

  distributeReward(): void {
    this.totalVotes.value = 0
    this.votersCount.value = 0
  }
}
