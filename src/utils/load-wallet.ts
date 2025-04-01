import { GasPrice, SigningStargateClient } from '@cosmjs/stargate';
import { getAkashTypeRegistry } from '@akashnetwork/akashjs/build/stargate/index.js';
import { DirectSecp256k1HdWallet, Registry } from '@cosmjs/proto-signing';
import { SERVER_CONFIG } from '../config.js';

export async function loadWalletAndClient() {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(SERVER_CONFIG.mnemonic, {
    prefix: 'akash',
  });
  const registry = getAkashTypeRegistry();

  const client = await SigningStargateClient.connectWithSigner(SERVER_CONFIG.rpcEndpoint, wallet, {
    registry: new Registry(registry),
    gasPrice: GasPrice.fromString('0.025uakt'),
  });

  return {
    wallet,
    client,
  };
}
