import GradientLayout from "../components/gradientComponent";
import { useMe } from "../lib/hooks";

export default function Home() {
  const { user } = useMe();
  return (
    <GradientLayout
      roundImage
      color="gray"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    >
      <div>Helloooooo</div>
    </GradientLayout>
  );
}
