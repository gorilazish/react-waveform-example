import * as React from 'react'
import _ from 'lodash'
import { Button, Timeline } from 'antd'
import { Flex } from 'reflexbox'
import faker from 'faker'


interface ControlPanelState {
  isPlaying: boolean
  events: FakeEvent[]
}

interface FakeEvent {
  color: string
  text: string
}

export default class ControlPanel extends React.Component<{}, ControlPanelState> {
  public state: ControlPanelState = {
    isPlaying: false,
    events: []
  }

  public componentDidMount() {
    this.setState({ events: this.generateFakeTimelineEvents() })
  }

  public render() {

    return (
      <Flex
        justify={'center'}
        align={'center'}
        column={true}
        style={{ width: '80%', margin: '10px auto' }}
      >
        <Button
          icon={this.state.isPlaying ? 'pause' : 'right'}
          shape='circle'
          style={{ height: '80px', width: '80px' }}
          onClick={this.onPlayClick}
        />
        <Flex justify='space-around' mt={'20px'} w={1}>
          <Timeline style={{
              width: '100%',
              height: '250px',
              overflowY: 'scroll',
              boxShadow: '-2px -1px 40px -11px',
              padding: '10px',
              backgroundColor: '#fcfcfd'
            }}>
            {this.state.events.map(e => 
              <div key={e.color + e.text} onClick={this.seekToFakePosition}>
                <Timeline.Item
                  color={e.color}
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {e.text}
                </Timeline.Item>
              </div>
            )}
          </Timeline>
        </Flex>
      </Flex>
    );
  }

  private onPlayClick = () => {
    this.togglePlay()
  }

  private togglePlay = () => {
    const player: any = document.getElementById('audio-player')
    player.paused ? player.play() : player.pause()
    this.setState({ isPlaying: !player.paused })
  }

  private seekToFakePosition = () => {
    const player: any = document.getElementById('audio-player')
    player.currentTime = _.random(1, player.duration)
    player.play()
    this.setState({ isPlaying: true})
  }

  private generateFakeTimelineEvents = () => {
    const count = 10
    const events: FakeEvent[] = []

    for(let i = 0; i < count; i++) {
      events.push({ color: Math.random() >= 0.5 ? 'green' : 'red', text: faker.fake("{{date.recent}} - {{lorem.words}}") })
    }
    return events
  }

}
