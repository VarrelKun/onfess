"use server";

import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import moment from "moment";

type CreateNewThreadProps = {
  content: string;
  sender?: string;
  group_slug: string;
};

export const createNewThread = async (props: CreateNewThreadProps) => {
  const slug = generateSlug(props.content);
  return await prisma.thread.create({
    data: {
      slug: slug,
      content: props.content,
      sender: props.sender,
      group: {
        connect: {
          slug: props.group_slug,
        },
      },
    },
  });
};

export const sendThreadComment = async (
  props: Omit<CreateNewThreadProps, "group_slug"> & {
    thread_slug: string;
  },
) => {
  const group = await prisma.thread.findUnique({
    where: {
      slug: props.thread_slug,
    },
    select: {
      group: true,
    },
  });
  if (!group) {
    throw new Error("Thread not found");
  }
  const slug = generateSlug(props.content);
  return await prisma.thread.create({
    data: {
      slug: slug,
      content: props.content,
      sender: props.sender,
      group: {
        connect: {
          slug: group.group.slug,
        },
      },
      answering: {
        connect: {
          slug: props.thread_slug,
        },
      },
    },
  });
};

export const getLastestThreadsByGroupSlug = async (
  slug: string,
  limit?: number,
) => {
  return await prisma.thread.findMany({
    where: {
      group: {
        slug: slug,
      },
      answering_id: null,
    },
    include: {
      _count: {
        select: {
          comments: true,
          shares: true,
        },
      },
    },

    orderBy: {
      created_at: "desc",
    },
    take: limit,
  });
};

export const getThreadBySlug = async (slug: string) => {
  return await prisma.thread.findUnique({
    where: {
      slug: slug,
    },
    include: {
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          shares: true,
        },
      },
    },
  });
};

export const getThreadsCommentsBySlug = async (
  slug: string,
  limit?: number,
) => {
  return await prisma.thread.findMany({
    where: {
      answering: {
        slug: slug,
      },
    },
    include: {
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          shares: true,
        },
      },
    },

    orderBy: {
      created_at: "desc",
    },
    take: limit,
  });
};

export const getLastestThreads = async (limit?: number) => {
  return await prisma.thread.findMany({
    where: {
      answering_id: null,
    },
    orderBy: [
      {
        created_at: "desc",
      },
    ],
    include: {
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          shares: true,
        },
      },
    },
    take: limit || 3,
  });
};
export const getPopularThreads = async (limit?: number) => {
  return await prisma.thread.findMany({
    where: {
      answering_id: null,
      comments: {
        some: {
          created_at: {
            gte: moment().add(-7, "days").toDate(),
          },
        },
      },
    },
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
      {
        shares: {
          _count: "desc",
        },
      },
    ],
    include: {
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          shares: true,
        },
      },
    },
    take: limit || 5,
  });
};

export const getPopularThreadsByGroupSlug = async (
  group_slug: string,
  limit?: number,
) => {
  return await prisma.thread.findMany({
    where: {
      group: {
        slug: group_slug,
      },
      answering_id: null,
      comments: {
        some: {
          created_at: {
            gte: moment().add(-7, "days").toDate(),
          },
        },
      },
    },
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
      {
        shares: {
          _count: "desc",
        },
      },
    ],
    include: {
      group: {
        select: {
          slug: true,
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
          shares: true,
        },
      },
    },
    take: limit || 3,
  });
};

export const deleteThread = async (
  slug: string,
  password: string,
): Promise<{
  error?: string;
}> => {
  const pw = await prisma.thread.findUnique({
    where: {
      slug: slug,
    },
    select: {
      group: {
        select: {
          password: true,
        },
      },
    },
  });

  if (pw?.group.password !== password) {
    return {
      error: "Kata sandi salah",
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.thread.deleteMany({
      where: {
        answering: {
          slug: slug,
        },
      },
    });
    await tx.thread.delete({
      where: {
        slug: slug,
      },
    });
  });
  return {};
};
