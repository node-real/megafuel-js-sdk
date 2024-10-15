import dotenv from 'dotenv'

dotenv.config({
  path: process.cwd() + '/tests/.env',
})

// testnet env
export const OPEN_PLATFORM_PRIVATE_KEY = process.env.OPEN_PLATFORM_PRIVATE_KEY
export const SPONSOR_URL = `https://open-platform-ap.nodereal.io/${OPEN_PLATFORM_PRIVATE_KEY}/megafuel-testnet`
export const CHAIN_ID = '97'
export const CHAIN_URL = `https://bsc-testnet.nodereal.io/v1/${OPEN_PLATFORM_PRIVATE_KEY}`
export const PAYMASTER_URL = 'https://bsc-megafuel-testnet.nodereal.io/97'
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string
export const POLICY_UUID = '72191372-5550-4cf6-956e-b70d1e4786cf'
export const ACCOUNT_ADDRESS = '0xF9A8db17431DD8563747D6FC770297E438Aa12eB'
export const CONTRACT_METHOD = '0xa9059cbb'
export const TOKEN_CONTRACT_ADDRESS = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee'
export const RECIPIENT_ADDRESS = '0xDE08B1Fd79b7016F8DD3Df11f7fa0FbfdF07c941'
export const PRIVATE_POLICY_UUID = "90f1ba4c-1f93-4759-b8a9-da4d59c668b4"
