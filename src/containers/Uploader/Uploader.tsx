import * as React from 'react'
import Dropzone from 'react-dropzone'
import { Flex } from 'reflexbox'
import './Uploader.scss'

export interface UploaderProps {
  onUpload: (files: any) => void
}

export default class Uploader extends React.Component<UploaderProps, any> {
  public render() {
    return (
      <div className='upload-container'>
        <Dropzone
          onDrop={this.onDrop}
          style={{ height: '100%', padding: '10px', transition: 'background-color 0.1s linear' }}
          accept='audio/mp3'
          activeStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
        >
          <Flex justify={'center'} align='center' style={{ height: '100%' }}>
            <h2>Drop your .mp3 here</h2>
          </Flex>
        </Dropzone>
      </div>
    );
  }

  private onDrop = (files) => {
    this.props.onUpload(files[0])
  }

}
