import * as React from 'react'
import { Slider } from 'antd'
import ReactAudioPlayer from 'react-audio-player'
import convertFileToBins from '../../utils/convertFileToBins'
import './Visualizer.scss'


export interface VisualizerProps {
  audioFile: any
}

interface VisualizerState {
  audioBuckets: number[]
  audioPath: string | undefined
  audioDuration: number | undefined
  progress: number
  nextSelected: number | undefined
}

export default class Visualizer extends React.Component<VisualizerProps, VisualizerState> {

  public state: VisualizerState = {
    audioBuckets: [],
    audioPath: undefined,
    audioDuration: undefined,
    progress: 0,
    nextSelected: undefined,
  }

  public componentDidMount() {
    const audioFile = this.props.audioFile
    convertFileToBins(audioFile)
      .then(bins => this.setState({ audioBuckets: bins, audioPath: audioFile.preview }))
    // this.setState({ audioPath: audioFile.preview })
  }

  public render() {
    const { audioBuckets, audioPath, progress } = this.state

    return (
      <div className='container'>
        <Slider onChange={this.onSliderChange} className='invisible-slider' />
        <svg style={{ height: '100%', width: '100%' }} viewBox="0 0 100 100" className="waveform-container" preserveAspectRatio="none">
          <rect className="waveform-bg" x="0" y="0" height="100" width="100"/>
          <rect id="waveform-progress" className="waveform-progress" x="0" y="0" height="100" width={progress}/>
          <svg height="0" width="50">
          <defs>
            <clipPath id="waveform-mask">
              {audioBuckets.length > 0 && this.renderBars(audioBuckets)}
            </clipPath>
          </defs>
        </svg>
      </svg>
      {this.state.audioPath && 
        <ReactAudioPlayer
          id='audio-player'
          src={audioPath}
          listenInterval={100}
          onLoadedMetadata={this.onAudioLoaded}
          onListen={this.updateProgress}
          controls={true}
        />}
    </div>

    );
  }

  private onAudioLoaded = (e) => {
    this.setState({ audioDuration: e.srcElement.duration })
  }

  private updateProgress = (e) => {
    const progress = parseFloat(((e / this.state.audioDuration!) * 100).toFixed(2))
    this.setState({ progress })
  }

  private onSliderChange = (value) => {
    const nextPosition = this.state.audioDuration! * (value / 100)
    const player: any = document.getElementById('audio-player')
    player.currentTime = nextPosition
    this.setState({ progress: value })
  }

  private renderBars = (bins) => {
    const SPACE_BETWEEN_BARS = 0.01

    return bins.map((bucket, i) => {
      const bucketSVGWidth = 100.0 / bins.length;
      const bucketSVGHeight = bucket * 100.0;
   
      return (
        <rect
          key={i}
          x={bucketSVGWidth * i + SPACE_BETWEEN_BARS / 2.0}
          y={(100 - bucketSVGHeight) / 2.0}
          width={bucketSVGWidth - SPACE_BETWEEN_BARS}
          height={bucketSVGHeight}
          style={{ fill: 'red' }}
        />
      )
    })
  }

}
