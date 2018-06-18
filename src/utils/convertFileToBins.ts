export default function convertFileToBins(file): Promise<number[]> {
  return new Promise(resolve => {
    readFileAsArrayBuffer(file)
    .then(buffer => decodeAudioBuffer(buffer))
    .then(normalized => resolve(samplesToBins(normalized)))
  })

}

function readFileAsArrayBuffer(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result)
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.readAsArrayBuffer(file);
  })
}

function decodeAudioBuffer (arrayBuffer) {
  return new Promise(resolve => {
    const audioContext = new AudioContext()
    audioContext.decodeAudioData(arrayBuffer, buffer => {
      const channelData = buffer.getChannelData(0)
      const normalized = channelData.map(t => t * 1000)
      resolve(normalized)
    })
  })
}

function samplesToBins(decodedAudio) {
  const NUMBER_OF_BUCKETS = 200
  const bucketDataSize = Math.floor(decodedAudio.length / NUMBER_OF_BUCKETS)
  const buckets: number[] = []
  for (let i = 0; i < NUMBER_OF_BUCKETS; i++) {
    const startingPoint = i * bucketDataSize
    const endingPoint = i * bucketDataSize + bucketDataSize
    let sum = 0
    for (let j = startingPoint; j < endingPoint; j++) {
      sum += decodedAudio[j]
    }
    const mean = sum / bucketDataSize

    const size = Math.abs(mean);
    buckets.push(size / 2);
  }

  return buckets
}