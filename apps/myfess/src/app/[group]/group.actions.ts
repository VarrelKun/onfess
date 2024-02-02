"use server";

import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";

export const createNewGroup = async (props: {
  name: string;
  password: string;
}) => {
  const slug = generateSlug(props.name);
  return await prisma.group.create({
    data: {
      slug: slug,
      name: props.name,
      password: props.password,
    },
  });
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
