import { musicData } from '../../../data/data';
import MusicPlayer from './MusicPlayer';

export function generateStaticParams() {
  return musicData.map((track) => ({
    slug: track.slug,
  }))
}

export default async function MusicPage({ params }) {
  const { slug } = await params;
  const track = musicData.find((t) => t.slug === slug);

  if (!track) {
    return <div>Track not found</div>;
  }

  const currentIndex = musicData.findIndex(t => t.slug === track.slug);
  const prevTrack = currentIndex > 0 ? musicData[currentIndex - 1] : null;
  const nextTrack = currentIndex < musicData.length - 1 ? musicData[currentIndex + 1] : null;

  return <MusicPlayer track={track} prevTrack={prevTrack} nextTrack={nextTrack} />;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const track = musicData.find((t) => t.slug === slug);
  
  return {
    title: `${track.title} - ${track.artist} | Vibes Music`,
    description: `Listen to ${track.title} by ${track.artist}`,
  }
}
