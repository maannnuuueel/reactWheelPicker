import { useState, useRef } from 'react';
import './App.css';
import Picker from './components/picker.js';
import './components/picker.css'


function App () {
	const initialList = [
		{ id: 0, val:1, minpos: 0, maxpos: 9 },
		{ id: 1, val:1, minpos: 1, maxpos: 8 },
		{ id: 2, val:2, minpos: 0, maxpos: 9 },
	  ];
	const [counts, setCounts] = useState(initialList);

	function updateC(v,id) {
		const nextC = counts.map(c => {
		  if (c.id != id) {
			return c;
		  } else {
			return {
			  ...c,
			  val: v,
			};
		  }
		});
		setCounts(nextC);
	}

	return (	
		<div className="flexcol app">
			<div className="textcenter">Select:</div>
			<Group couns={counts} handlepicks={updateC} />
			<TextFeld inhalt={counts.map((item) => {return item.val})} />
		</div>
	);
  	
}

function TextFeld ({inhalt}) {
	return (<div className='textcenter'>{inhalt}</div>);
}

function Group ({couns,handlepicks}) {
	return (
		<div className="group textcenter flexrow">
			{couns.map((item) => <Picker pick={(v) => {handlepicks(v,item.id)}} key={item.id} scrollpos={-item.val} minpos={item.minpos} maxpos={item.maxpos}/>)}
		</div>
	);
}

export default App;
