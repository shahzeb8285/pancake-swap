import { ChainId, CurrencyAmount } from '@pancakeswap/sdk'
import { deserializeToken } from '@pancakeswap/token-lists'
import fromPairs_ from 'lodash/fromPairs'
import { StableSwapPair } from './types'
import { createStableSwapPair } from './stableSwap'
import { getStableSwapPools } from './constants/stableSwap'
import { isStableSwapSupported, STABLE_SUPPORTED_CHAIN_IDS } from './constants/stableSwap/pools'

export function getStableSwapPairs(chainId: ChainId): StableSwapPair[] {
  // Stable swap is only supported on BSC chain & BSC testnet
  if (!isStableSwapSupported(chainId)) {
    return []
  }

  const pools = getStableSwapPools(chainId)
  return pools.map(({ token, quoteToken, stableSwapAddress, lpAddress, infoStableSwapAddress }) => {
    const token0 = deserializeToken(token)
    const token1 = deserializeToken(quoteToken)
    return createStableSwapPair(
      {
        token0,
        token1,
        reserve0: CurrencyAmount.fromRawAmount(token0, '0'),
        reserve1: CurrencyAmount.fromRawAmount(token1, '0'),
      },
      stableSwapAddress,
      lpAddress,
      infoStableSwapAddress,
    )
  })
}

export const stableSwapPairsByChainId = fromPairs_(
  STABLE_SUPPORTED_CHAIN_IDS.map((chainId) => [chainId, getStableSwapPairs(chainId)]),
)
