import { useRef  } from 'react';
import './picker.css'


function Picker ({maxpos, minpos, scrollpos, pick}) {
  let isDown = false;
  const myRef = useRef();
  
  function skroll () {
    let slider = myRef.current;
    let startY;
    let currentPos;
    

    slider.addEventListener('mousedown', (e) => {
      isDown = true
      startY = e.pageY;
      currentPos = scrollpos;
    })

    slider.addEventListener('mouseleave', () => {
      isDown = false
     })

    slider.addEventListener('mouseup', () => {
      isDown = false
    })

    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const y = e.pageY;
      const walk = (y - startY)/8;
      
      let newPos = currentPos + Math.round(walk);

      if (!isNaN(walk) && -newPos <= maxpos && -newPos >= minpos){
        pick(-newPos);
      }
    })
  }

  return (
        <div className="rad" ref={myRef} onMouseOver={skroll} style={{cursor: isDown ? 'grabbing' : 'grab'}}>      
          <div className="zelle rand">{-scrollpos >= minpos +2 ? -scrollpos - 2 : ""}</div>
          <div className="zelle fastmitte">{-scrollpos >= minpos +1 ? -scrollpos - 1 : ""}</div>
          <div className="zelle mitte">{-scrollpos}</div>
          <div className="zelle fastmitte">{-scrollpos <= maxpos -1 ? -scrollpos + 1 : ""}</div>
          <div className="zelle rand">{-scrollpos <= maxpos -2 ? -scrollpos + 2 : ""}</div>
        </div>
  );
}

export default Picker;