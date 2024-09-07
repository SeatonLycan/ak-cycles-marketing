import ReactPlayer from 'react-player/file'
import AkVideo from '@assets/ak-cycles-vid.mp4';

const HeroVideo = () => {
  return (
    <ReactPlayer url={AkVideo} controls={true} />
  )
}

export default HeroVideo;