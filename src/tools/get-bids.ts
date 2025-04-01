import { z } from 'zod';
import type { ToolDefinition, ToolContext } from '../types/index.js';
import { QueryClientImpl as QueryMarketClient } from '@akashnetwork/akash-api/akash/market/v1beta4';
import { QueryBidsRequest } from '@akashnetwork/akash-api/akash/market/v1beta4';
import { createOutput } from '../utils/index.js';
import { getRpc } from '@akashnetwork/akashjs/build/rpc/index.js';
import { SERVER_CONFIG } from '../config.js';

const parameters = z.object({
  dseq: z.number().int().positive(),
  owner: z.string().min(1),
});

export const GetBidsTool: ToolDefinition<typeof parameters> = {
  name: 'get-bids',
  description:
    'Get bids for a deployment with the given dseq number, owner. Should be used to get bids for a deployment that is currently being bid on. Multiple calls to this tool might be needed to fetch all bids.',
  parameters,
  handler: async (params: z.infer<typeof parameters>, context: ToolContext) => {
    const { dseq, owner } = params;
    const rpc = await getRpc(SERVER_CONFIG.rpcEndpoint);
    const marketClient = new QueryMarketClient(rpc);

    const request = QueryBidsRequest.fromPartial({
      filters: {
        owner: owner,
        dseq: dseq,
      },
    });

    let bids: {
      bidId: string;
      state: string;
      price: string;
      createdAt: string;
    }[] = [];

    const bidsResponse = await marketClient.Bids(request);
    bids = bidsResponse.bids.map((bid) => {
      return {
        bidId: JSON.stringify(bid.bid?.bidId),
        state: JSON.stringify(bid.bid?.state),
        price: JSON.stringify(bid.bid?.price),
        createdAt: JSON.stringify(bid.bid?.createdAt),
      };
    });

    if (bids.length > 0) {
      return createOutput(bids);
    } else {
      return createOutput('No bids found for deployment ' + dseq + '.');
    }
  },
};
