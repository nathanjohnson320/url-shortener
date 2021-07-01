import React, { useState } from 'react';

import { noOp } from '@utility';

function formatAndSubmit({e, data, submitFunction }) {
  e.preventDefault();

  submitFunction(data);
}

function formatInput({e, data, inputFunction, setData }) {
  const target = e.target;
  let val = null;

  switch(target.type) {
  case 'checkbox':
    val = target.checked;
    break;
  case 'select-multiple':
    val = [ ...target.options ].filter(x => x.selected).map(x => x.value);
    break;
  default:
    val = target.value;
    break;
  }

  const nextData = {
    ...data,
    [target.name]: val,
  };
  setData(nextData);
  inputFunction(nextData);
}

export default function Form(props) {
  const [data, setData] = useState({});

  return (
    <form
      {...props}
      onSubmit={(e) => formatAndSubmit({
        e,
        data,
        submitFunction: props.onSubmit || noOp,
      })}
      onInput={(e) => formatInput({
        e,
        data,
        setData,
        inputFunction: props.onInput || noOp,
      })}
    >
      {props.children}
    </form>
  );
}
