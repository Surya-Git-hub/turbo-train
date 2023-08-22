import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ]
});

async function main() {
    const user = await trpc.userById.query('1');
    console.log("user", user);

    const createdUser = await trpc.userCreate.mutate({ name: 'surya' });
    console.log("created user", createdUser);

    const users = await trpc.userlist.query();
    console.log("all users", users);

}

main().catch(console.error);