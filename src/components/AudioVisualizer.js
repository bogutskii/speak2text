import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MicrophoneError from "./MicrophoneError";
const AudioVisualizer = ({ isListening }) => {
  const [volume, setVolume] = useState(0);
  let audioContext;
  let analyser;
  let dataArray;
  let source;

  useEffect(() => {
    setupMicrophone();
    return () => {
      if (source) source.disconnect();
      if (audioContext) audioContext.close();
    };
  }, [isListening]);

  const setupMicrophone = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    draw();
  };

  const draw = () => {
    if (!isListening) {
      return;
    }
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    let sum = dataArray.reduce((a, b) => a + b, 0);
    let average = sum / dataArray.length;
    setVolume(average / 80.0);
  };

  const calculateColor = (volume) => {
    if (volume > 0.7) {
      return "rgb(255, 0, 0)"; 
    }
    return `rgb(${volume * 255}, ${255 - volume * 255}, 0)`;
  };

  const barColor = isListening ? calculateColor(volume) : "white"; 
  const barHeight = isListening ? Math.min(volume * 200, 200) : 0; 

  return (
    <div
      style={{
        width: "200px",
        height: "20px",
        backgroundColor: "#eee",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${barHeight}px`,
          height: '100%',
          backgroundColor: barColor,
          position: "absolute",
          bottom: 0,
        }}
      />
       <MicrophoneError volume={volume}/>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
});

export default connect(mapStateToProps)(AudioVisualizer);