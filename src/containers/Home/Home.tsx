import * as React from 'react'
import Uploader from '../Uploader'
import Visualizer from '../Visualizer'
import ControlPanel from '../ControlPanel'


export interface HomeState {
  audioFile: any // todo: change to proper type
}

export default class Home extends React.Component<{}, HomeState> {

  public state: HomeState = {
    audioFile: undefined
  }

  public render() {
    const { audioFile } = this.state

    return (
      <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
        <div style={{ height: '300px' }}>
          {!audioFile ? <Uploader onUpload={this.onAudioUpload} /> : <Visualizer audioFile={audioFile} />}
        </div>
        {audioFile && <ControlPanel />}
      </div>
    );
  }

  private onAudioUpload = (files) => {
    this.setState({ audioFile: files })
  }
}