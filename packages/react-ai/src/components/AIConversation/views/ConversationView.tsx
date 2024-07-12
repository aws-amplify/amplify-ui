import React from 'react';
import { ViewElement as View } from '../context/elements/definitions';
import { HeaderControl } from './Controls/HeaderControl';

//         //         display: 'flex',
//         //         flexDirection: 'row',
//         //         justifyContent: 'space-between',
//         //         border: '1px solid rgba(220, 222, 224, 1)',
//         //         borderRadius: '16px 16px 0px 0px',
//         //         padding: '0px 16px',
//         //         boxShadow: '0px 12px 30px 0px rgba(0, 0, 0, 0.07)',
//         //         backgroundColor: 'rgba(250, 250, 250, 1)',

export default function Conversation(): JSX.Element {
  return (
    <View
      style={{
        width: '584px',
        height: '344px',
      }}
    >
      <HeaderControl />
      <View
        style={{
          borderLeft: '1px solid rgba(220, 222, 224, 1)',
          borderRight: '1px solid rgba(220, 222, 224, 1)',
          padding: '0px 16px',
          height: '300px',
        }}
      >
        messages subcomponent
      </View>
      <View
        style={{
          border: '1px solid rgba(220, 222, 224, 1)',
          borderTop: 'none',
          borderRadius: '0px 0px 16px 16px',
          padding: '0px 16px',
        }}
      >
        input subcomponent
      </View>
    </View>
  );
}
