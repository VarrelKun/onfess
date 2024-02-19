import Link from "next/link";
import { getGroupBySlug } from "../../group.actions";

type Props = {
  group_slug: string;
};

export default async function ThreadHeaderName({ group_slug }: Props) {
  const group = await getGroupBySlug(group_slug);
  return <Link href={`/${group?.slug ?? ""}`}>{group?.name ?? ""}</Link>;
}
