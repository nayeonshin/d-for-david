import { RoomPage } from "@/components/RoomPage";

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function Page({ params }: PageProps) {
  const { code } = await params;
  return <RoomPage code={code} />;
}
