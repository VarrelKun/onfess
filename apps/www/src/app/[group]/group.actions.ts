"use server";

import { verifyTurnstile } from "@/actions/turnstile";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { ServerActionResponse } from "@/type/Action";

export const createNewGroup = async (props: {
  name: string;
  password: string;
  captcha: string;
}): Promise<
  ServerActionResponse<{
    id: string;
    slug: string;
    name: string;
  }>
> => {
  if (!(await verifyTurnstile(props.captcha))) {
    return {
      error: "Captcha tidak valid, silahkan coba lagi",
    };
  }
  const slug = generateSlug(props.name);
  const group = await prisma.group.create({
    data: {
      slug: slug,
      name: props.name,
      password: props.password,
    },
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });
  return {
    data: group,
  };
};

export const getGroupBySlug = async (slug: string) => {
  return await prisma.group.findUnique({
    where: {
      slug: slug,
    },
  });
};

export const getPopularGroup = async () => {
  return await prisma.group.findMany({
    orderBy: [
      {
        threads: {
          _count: "desc",
        },
      },
    ],
    take: 5,
  });
};

export const getAllGroupSlug = async () => {
  return await prisma.group.findMany({
    select: {
      slug: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });
};
