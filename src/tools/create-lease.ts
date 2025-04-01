import { z } from 'zod';
import type { ToolDefinition, ToolContext } from '../types/index.js';
import {
  BidID,
  Lease,
  LeaseID,
  MsgCreateLease,
} from '@akashnetwork/akash-api/akash/market/v1beta4';
import { getTypeUrl } from '@akashnetwork/akashjs/build/stargate/index.js';
import { createOutput } from '../utils/create-output.js';

const parameters = z.object({
  owner: z.string().min(1),
  dseq: z.number().min(1),
  gseq: z.number().min(1),
  oseq: z.number().min(1),
  provider: z.string().min(1),
});

export const CreateLeaseTool: ToolDefinition<typeof parameters> = {
  name: 'create-lease',
  description:
    'Create a lease on Akash Network using the provided owner, dseq, gseq, oseq and provider from a bid.',
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    const { client, wallet } = context;
    const accounts = await wallet.getAccounts();
    const bid = BidID.fromPartial({
      owner: params.owner,
      dseq: params.dseq,
      gseq: params.gseq,
      oseq: params.oseq,
      provider: params.provider,
    });

    const lease = MsgCreateLease.fromPartial({ bidId: bid });
    const msg = {
      typeUrl: getTypeUrl(MsgCreateLease),
      value: lease,
    };

    const tx = await client.signAndBroadcast(accounts[0].address, [msg], 'auto');
    return createOutput(tx.rawLog);
  },
};
