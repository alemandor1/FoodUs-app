import React from "react";
import { Icon } from "react-native-elements";
import '../components/Timer.css';

function BtnComponent(props) {
  return (
    <div>
      {props.status === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-red"
          onClick={props.start}
        >
          <Icon type="material-community" name="record" color="#eb2d2d"/>
        </button>
      ) : (
        ""
      )}

      {props.status === 1 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.stop}
          >
            <Icon type="material-community" name="pause" color="#00ABA9"/>
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            <Icon type="material-community" name="step-backward" color="#FFC900"/>
          </button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-blu"
            onClick={props.resume}
          >
            <Icon type="material-community" name="play" color="#4f44eb"/>
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            <Icon type="material-community" name="step-backward" color="#FFC900"/>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BtnComponent;
