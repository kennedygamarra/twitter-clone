import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  getFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      const tweets = await ctx.prisma.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? { id_createdAt: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: {
            select: { likes: true },
          },
          likes:
            currentUserId == null
              ? false
              : { where: { userId: currentUserId } },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (tweets.length > limit) {
        nextCursor = tweets.pop();
        if (nextCursor != null) {
          nextCursor = { id: nextCursor.id, createdAt: nextCursor.createdAt };
        }
      }

      return {
        data: tweets.map((tweet) => {
          return {
            id: tweet.id,
            content: tweet.content,
            createdAt: tweet.createdAt,
            likesCount: tweet._count.likes,
            user: tweet.user,
            isLikedByMe: tweet.likes?.length > 0,
          };
        }),
        nextCursor,
      };
    }),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      return await ctx.prisma.tweet.create({
        data: {
          content,
          userId: ctx.session.user.id,
        },
      });
    }),
  like: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ input: { tweetId }, ctx }) => {
      const data = {
        tweetId: tweetId,
        userId: ctx.session.user.id,
      };

      const isLiked = await ctx.prisma.like.findUnique({
        where: {
          userId_tweetId: data,
        },
      });

      if (isLiked == null) {
        await ctx.prisma.like.create({
          data,
        });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({
          where: {
            userId_tweetId: data,
          },
        });
        return { addedLike: false };
      }
    }),
});
